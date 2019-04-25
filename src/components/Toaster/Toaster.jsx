const Toster = ({ children }) => (
	<div role="alert" aria-live="assertive" aria-atomic="true" id="toast" className="toast">
		<div className="toast-body">{children}</div>
	</div>
);

export default Toster;
