import React from "react";

class TextField extends React.Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	focus() {
		this.inputRef.current.focus();
	}

	render() {

		return (
			<input
				type={this.props.type}
				placeholder={this.props.placeholder}
				required={this.props.required}
				onChange={this.props.onChange}
				{...this.props}
				value={this.props.value}
				ref={this.inputRef}
				className={`active:border-none w-full static active:border-primaryAuthentication focus:border-primaryAuthentication text-primaryAuthentication my-3 outline-none h-12 px-3 py-1 font-normal rounded-2xl border-solid border-2 placeholder:decoration-[#A0A9AB] text-base border-[#D1D7D4] ${this.props.className}`}
			/>
		)
	}
}

export default TextField;
