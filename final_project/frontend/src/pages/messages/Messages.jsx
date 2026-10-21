import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss';
import { getConversation, getConversations, sendMessage } from '../../api/chat';
import { getErrorMessage } from '../../api/client';
import { decideRentRequest } from '../../api/user';
import ActionButton from '../../components/action_button/ActionButton';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ProfileHeading from '../../components/profile_heading/ProfileHeading';
import SideNav from '../../components/sideNav/SideNav';
import { LISTING_KIND } from '../../constants';
import useConversationChannel from '../../hooks/useConversationChannel';

const STATUS_LABEL = {
    active: 'Available',
    pending: 'Rent requested',
    taken: 'Rented',
};

const fullName = (user) => (user ? `${user.firstName} ${user.lastName}` : 'Deleted user');

const formatTime = (isoDate) =>
    new Date(isoDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

/** Profile picture that falls back to the user's initials when the image is missing or fails to load. */
const Avatar = ({ user }) => {
    const [hasError, setHasError] = useState(false);

    if (!user?.profilePicture || hasError) {
        const initials = user ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}` : '?';
        return <span className="chat__avatar chat__avatar--initials">{initials.toUpperCase()}</span>;
    }
    return <img src={user.profilePicture} alt="" className="chat__avatar" onError={() => setHasError(true)} />;
};

/** The other participant, seen from the current user's side. */
const getCounterpart = (conversation, currentUserId) =>
    conversation.ownerRef?._id === currentUserId ? conversation.tenantRef : conversation.ownerRef;

const ConversationList = ({ conversations, activeId, currentUserId }) => (
    <aside className="chat__list">
        {conversations.length === 0 && <p className="chat__empty">No conversations yet.</p>}
        {conversations.map((conversation) => {
            const counterpart = getCounterpart(conversation, currentUserId);
            return (
                <Link
                    key={conversation._id}
                    to={`/profile/messages/${conversation._id}`}
                    className={classNames('chat__list--item', { 'chat__list--item--active': conversation._id === activeId })}
                >
                    <Avatar user={counterpart} />
                    <div className="chat__list--text">
                        <span className="chat__list--name">{fullName(counterpart)}</span>
                        <span className="chat__list--listing">{conversation.listingRef?.title ?? 'Listing removed'}</span>
                        <span className="chat__list--preview">{conversation.lastMessageText || 'No messages yet'}</span>
                    </div>
                </Link>
            );
        })}
    </aside>
);

const ChatThread = ({ conversationId, currentUserId, onActivity }) => {
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesRef = useRef(null);

    useEffect(() => {
        let isCancelled = false;

        getConversation(conversationId)
            .then((data) => {
                if (isCancelled) return;
                setConversation(data.conversation);
                setMessages(data.messages);
            })
            .catch((error) => !isCancelled && toast.error(getErrorMessage(error, 'Could not open this conversation')));

        return () => {
            isCancelled = true;
        };
    }, [conversationId]);

    const appendMessage = useCallback((message) => {
        // The sender gets the message both from the HTTP response and the socket push.
        setMessages((prev) => (prev.some((item) => item._id === message._id) ? prev : [...prev, message]));
    }, []);

    const setListingStatus = useCallback((status) => {
        setConversation((prev) => prev && { ...prev, listingRef: { ...prev.listingRef, status } });
    }, []);

    useConversationChannel(conversationId, {
        onMessage: (message) => {
            appendMessage(message);
            onActivity();
        },
        onListingStatus: ({ listingId, status }) => {
            if (conversation?.listingRef?._id === listingId) setListingStatus(status);
        },
    });

    useEffect(() => {
        const container = messagesRef.current;
        if (container) container.scrollTop = container.scrollHeight;
    }, [messages]);

    if (!conversation) {
        return <section className="chat__thread chat__thread--empty">Loading conversation...</section>;
    }

    const listing = conversation.listingRef;
    const counterpart = getCounterpart(conversation, currentUserId);
    const isOwner = conversation.ownerRef?._id === currentUserId;
    const canDecide = isOwner && listing?.status === 'pending';

    const handleSend = async (e) => {
        e.preventDefault();
        const text = draft.trim();
        if (!text) return;

        setIsSending(true);
        try {
            appendMessage(await sendMessage(conversationId, text));
            setDraft('');
            onActivity();
        } catch (error) {
            toast.error(getErrorMessage(error, 'Message not sent'));
        } finally {
            setIsSending(false);
        }
    };

    const handleDecision = async (decision) => {
        try {
            await decideRentRequest(listing._id, decision);
            setListingStatus(decision === 'accept' ? 'taken' : 'active');
            toast.success(decision === 'accept' ? 'Renting approved' : 'Rent request rejected');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <section className="chat__thread">
            <header className="chat__thread--header">
                <Avatar user={counterpart} />
                <div className="chat__thread--title">
                    <span className="chat__list--name">{fullName(counterpart)}</span>
                    {listing && (
                        <Link to={`/listing-details/${listing._id}?type=${LISTING_KIND.RENT_OUT}`} className="chat__list--listing">
                            {listing.title} · ${listing.price}/month
                        </Link>
                    )}
                </div>
                {listing && <span className="chat__status">{STATUS_LABEL[listing.status] ?? listing.status}</span>}
                {canDecide && (
                    <div className="chat__thread--actions">
                        <ActionButton variant="success" onClick={() => handleDecision('accept')}>Approve renting</ActionButton>
                        <ActionButton variant="outline" onClick={() => handleDecision('reject')}>Reject</ActionButton>
                    </div>
                )}
            </header>

            <div className="chat__messages" ref={messagesRef}>
                {messages.length === 0 && <p className="chat__empty">Say hello to start the conversation.</p>}
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={classNames('chat__message', { 'chat__message--own': message.senderRef === currentUserId })}
                    >
                        <p className="chat__message--text">{message.text}</p>
                        <span className="chat__message--time">{formatTime(message.createdAt)}</span>
                    </div>
                ))}
            </div>

            <form className="chat__composer" onSubmit={handleSend}>
                <input
                    type="text"
                    className="chat__composer--input"
                    placeholder="Write a message..."
                    aria-label="Message"
                    maxLength={2000}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                />
                <ActionButton type="submit" disabled={isSending || !draft.trim()}>Send</ActionButton>
            </form>
        </section>
    );
};

const Messages = () => {
    const { conversation_id: conversationId } = useParams();
    const { user } = useSelector((state) => state.user);
    const [conversations, setConversations] = useState([]);

    const loadConversations = useCallback(() => {
        getConversations()
            .then(setConversations)
            .catch((error) => toast.error(getErrorMessage(error, 'Could not load your conversations')));
    }, []);

    useEffect(() => {
        loadConversations();
    }, [loadConversations, conversationId]);

    return (
        <>
            <Header />
            <section className='my__listing__page--section'>
                <SideNav />
                <main className='dashboard__container'>
                    <ProfileHeading />
                    <div className="chat">
                        <ConversationList conversations={conversations} activeId={conversationId} currentUserId={user._id} />
                        {conversationId ? (
                            <ChatThread
                                key={conversationId}
                                conversationId={conversationId}
                                currentUserId={user._id}
                                onActivity={loadConversations}
                            />
                        ) : (
                            <section className="chat__thread chat__thread--empty">Select a conversation</section>
                        )}
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default Messages;
