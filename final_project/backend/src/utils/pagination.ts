import type { PipelineStage } from 'mongoose';

export interface PageMetaData {
    totalDocuments: number;
    pageNumber: number;
    totalPages: number;
    /** Number of documents shown up to and including the current page. */
    presentedDocs: number;
}

export interface Page<T> {
    metaData: PageMetaData;
    data: T[];
}

export interface PaginationFacet<T> {
    metaData: { totalDocuments: number }[];
    data: T[];
}

/** `pageStages` run only on the documents of the requested page (e.g. lookups). */
export const paginationStage = (
    page: number,
    limit: number,
    pageStages: PipelineStage.FacetPipelineStage[] = [],
): PipelineStage.Facet => ({
    $facet: {
        metaData: [{ $count: 'totalDocuments' }],
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }, ...pageStages],
    },
});

/** Shapes the single result document of an aggregation that ends with `paginationStage`. */
export const toPage = <T>(
    [facet]: PaginationFacet<T>[],
    page: number,
    limit: number,
): Page<T> => {
    const totalDocuments = facet?.metaData[0]?.totalDocuments ?? 0;

    return {
        metaData: {
            totalDocuments,
            pageNumber: page,
            totalPages: Math.ceil(totalDocuments / limit),
            presentedDocs: Math.min(page * limit, totalDocuments),
        },
        data: facet?.data ?? [],
    };
};
