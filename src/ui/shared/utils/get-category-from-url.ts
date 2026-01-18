export const getCategoryFromUrl = (params: URLSearchParams) => {
    const categoryFromUrl = params.get("category")
    if (!categoryFromUrl) return null
    const parsed = parseInt(categoryFromUrl, 10)
    return isNaN(parsed) ? null : parsed
}