/**
 * MSW 핸들러 검증용 상수 (문자열 비교 대신 일원화하여 유지보수 용이)
 */

/** GET /api/v1/profilings/forms/active — profiling_type */
export const PROFILING_TYPES = ['PREFERENCE', 'HEALTH'] as const
export type ProfilingType = (typeof PROFILING_TYPES)[number]

/** PUT /api/v1/profilings/images/presigned-url — image_format */
export const IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'webp'] as const
export type ImageFormat = (typeof IMAGE_FORMATS)[number]

/** POST /api/v1/profilings/images/analyze — image_type (사진 유형) */
export const IMAGE_TYPES = ['OOTD', 'INTERIOR'] as const
export type ImageType = (typeof IMAGE_TYPES)[number]

/** POST /api/v1/profilings/images/analyze — product_type */
export const PRODUCT_TYPES = ['DIFFUSER', 'PERFUME'] as const
export type ProductType = (typeof PRODUCT_TYPES)[number]
