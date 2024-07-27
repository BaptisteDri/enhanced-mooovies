import { createClient } from "@/libs/supabase/server"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"

export const SeenMoviesPreview = async () => {
	const supabase = createClient()
	const { data: userData } = await supabase.auth.getUser()

	const { data } = await supabase
		.from("films")
		.select()
		.eq("user_id", userData.user?.id)
		.limit(10)
		.not("watched_date", "is", null)
		.order("watched_date", { ascending: false })

	return data && data.length > 0 ? (
		<MoviesListPreviewSection
			href={"#"}
			title={"Revoir"}
			movies={data || []}
		/>
	) : (
		<></>
	)
}
