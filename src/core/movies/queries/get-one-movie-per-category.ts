import {
	GetOneMoviePerCategoryDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	dto: GetOneMoviePerCategoryDto
	enabled?: boolean
}

export const GET_ONE_MOVIE_PER_CATEGORY_KEY = "GET-ONE-MOVIE-PER-CATEGORY"

export const getOneMoviePerCategory = ({
	enabled = false,
	dto,
}: Options) => ({
	queryKey: [GET_ONE_MOVIE_PER_CATEGORY_KEY, dto.userId, dto.categoryIds],
	queryFn: async () => {
		return await movies.getOneMoviePerCategory(dto)
	},
	enabled,
})
