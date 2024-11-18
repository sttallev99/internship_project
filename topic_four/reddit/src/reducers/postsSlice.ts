import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Posts {
    posts: Post[]
}

export interface Post {
    id: number,
    title: string,
    user: {
        username: string,
        user_image: string,
    },
    post_date: number,
    post_image?: string,
    post_text?: string,
    likes: number,
    comments: string[]
}

const initialState: Posts = {
    posts: [
        {
            id: 1,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731760782001,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 2,
            title: "So close",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_2xqtc/styles/communityIcon_jqz1crvzd95b1.jpeg?width=48&height=48&frame=1&auto=webp&crop=48:48,smart&s=48d52a44dd142c9b718e7b33e7a61ba3f09f8f18"
            },
            post_date: 1706140800000,
            post_image: 'https://preview.redd.it/uk8qqj3fi81e1.jpeg?auto=webp&s=24f93d49bc4dda4182cb91e8c78d56d6bb990d9f',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 3,
            title: "Today 10 years ago Max Verstappen raced in the 2014 Macau GP (F3 cars), finishing 7th after starting in the 24th position",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_2qimj/styles/communityIcon_8wbp8f6o5jkc1.png?width=48&height=48&frame=1&auto=webp&crop=48:48,smart&s=13336977a38962e76d8526f5c9a0c889ee03a3a1"
            },
            post_date: 1718409600000,
            post_image: 'https://preview.redd.it/today-10-years-ago-max-verstappen-raced-in-the-2014-macau-v0-h8ov8rhx691e1.jpeg?width=1080&crop=smart&auto=webp&s=ce6a52589b83468b8c812b3796eec86af2094113',
            likes: 956,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 4,
            title: "Tired of spending hours creating reports? List and Label makes it easy to create custom and interactive reports that your customers will love. Learn more about hot List and Label can streamline your reporting tasks on the combit website",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_6fq904/styles/profileIcon_k8wel5d2se7a1.jpg?width=48&height=48&frame=1&auto=webp&crop=48:48,smart&s=23cc5f461b2fd1eaafdbeb23e054791538742745"
            },
            post_date: 1700438400000,
            post_image: 'https://external-preview.redd.it/zV1uW5I068QEMZAoqKKN3pSnRQjsKWgN4IbunyDc5Hk.jpg?width=1080&crop=smart&auto=webp&s=99dbaf557afa2fe74d8987085ebd1f630db93543',
            likes: 47,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 5,
            title: "Long-range power DPS",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1714867200000,
            post_text: "I generally like the longrange dps as it gives you a much better overview of the fight (which i have a strong preference for) and while often theoretically lower dps, practically it can be higher due to less requirement to dodge all the time.When I rejoined GW2 after 6 years, I did not start anything with range because I heard that it was bad. Nonetheless, I notice that I am really want to return to that easy playstyle, at least until I can learn the game better. Considering I'll soon buy an expansion, what should I use my level 80 boost on to have a long range power build that is working for open world an other pve content (e.g. raids, fractals, etc )?I do prefer a power build as -to my understanding- it is less skill dependant. I am litterally looking for the strongest, but boring long range build so I can focus on learning all the other facets of the game.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 6,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1707350400000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 7,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731744300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 8,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731702240000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 9,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date:  1731567300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 10,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 11,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 12,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 13,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 14,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 15,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 16,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 17,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 18,
            title: "Long-range power DPS",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1714867200000,
            post_text: "I generally like the longrange dps as it gives you a much better overview of the fight (which i have a strong preference for) and while often theoretically lower dps, practically it can be higher due to less requirement to dodge all the time.When I rejoined GW2 after 6 years, I did not start anything with range because I heard that it was bad. Nonetheless, I notice that I am really want to return to that easy playstyle, at least until I can learn the game better. Considering I'll soon buy an expansion, what should I use my level 80 boost on to have a long range power build that is working for open world an other pve content (e.g. raids, fractals, etc )?I do prefer a power build as -to my understanding- it is less skill dependant. I am litterally looking for the strongest, but boring long range build so I can focus on learning all the other facets of the game.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 19,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1707350400000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 20,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731744300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 21,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731702240000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 22,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date:  1731567300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 23,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 24,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 25,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 26,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 27,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 28,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 29,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 30,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 31,
            title: "Long-range power DPS",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1714867200000,
            post_text: "I generally like the longrange dps as it gives you a much better overview of the fight (which i have a strong preference for) and while often theoretically lower dps, practically it can be higher due to less requirement to dodge all the time.When I rejoined GW2 after 6 years, I did not start anything with range because I heard that it was bad. Nonetheless, I notice that I am really want to return to that easy playstyle, at least until I can learn the game better. Considering I'll soon buy an expansion, what should I use my level 80 boost on to have a long range power build that is working for open world an other pve content (e.g. raids, fractals, etc )?I do prefer a power build as -to my understanding- it is less skill dependant. I am litterally looking for the strongest, but boring long range build so I can focus on learning all the other facets of the game.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 32,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1707350400000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 33,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731744300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 34,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1731702240000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 35,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date:  1731567300000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 36,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 37,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 38,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 39,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 40,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 41,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 42,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1730789700000,
            post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        {
            id: 43,
            title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
            user: {
                username: "u/test",
                user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
            },
            post_date: 1105944900000,
            post_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            likes: 20,
            comments: ['fist comment', 'second comment']
        },
        
    ]
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addLike(state, action: PayloadAction<number>) {
            state.posts.forEach(p => {
                if(p.id === action.payload) {
                    p.likes += 1
                    return;
                }
            })
        },
        addDislike(state, action: PayloadAction<number>) {
            state.posts.forEach(p => {
                if(p.id === action.payload) {
                    p.likes -= 1
                    return;
                }
            })
        },
        removePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(p => p.id !== action.payload);
        }
    }
});

export const { addLike, addDislike, removePost } = postsSlice.actions;
export default postsSlice.reducer;
