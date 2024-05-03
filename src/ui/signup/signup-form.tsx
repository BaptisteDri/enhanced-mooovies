export const SignupForm = () => {
	return (
		<form>
			<div>
				<input
					type="checkbox"
					id="acceptCguPrivacy"
					name="acceptCguPrivacy"
				/>
				<label htmlFor="acceptCguPrivacy">
					J'ai lu et j'accepte les{" "}
					<a href="/cgu">Conditions Générales d'Utilisation</a> et la{" "}
					<a href="/confidentialite">Politique de Confidentialité</a>.
				</label>
			</div>
		</form>
	)
}
