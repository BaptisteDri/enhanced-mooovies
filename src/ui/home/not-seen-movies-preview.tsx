import { createClient } from "@/libs/supabase/server"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"

export const NotSeenMoviesPreview = async () => {
	const supabase = createClient()
	const { data: userData } = await supabase.auth.getUser()

	const { data } = await supabase
		.from("films")
		.select()
		.eq("user_id", userData.user?.id)
		.limit(10)
		.is("watched_date", null)
		.order("added_date", { ascending: false })

	return (
		<MoviesListPreviewSection
			href={"#"}
			title={"À voir"}
			movies={data || []}
		/>
	)
}
