import React from 'react'
import TextField from '../../UI/fields/TextField'
import SelectField from '../../UI/fields/SelectField'

const UserInformation = () => {
	// const [UserInformation, setUserInformation] = useState({});
  return (
	<div className = "flex flex-wrap">
		<div className = "w-1/2 gap-2">
			<TextField className = "flex-1-1" 
				placeholder = "Email" 
				readOnly = {true} 
			/>
			<TextField 
				className = ""
				placeholder = "First name"
			/>
			<TextField 
				className = "" 
				placeholder = "Last name"
			/>
			<TextField 
				className = "" 
				placeholder = "User name" 
			/>
		</div>
		<div className="w-1/2">
			<div>
				<SelectField>
					<option>Male</option>
					<option>Female</option>
					<option>Other</option>
				</SelectField>
			</div>
			
		</div>
	</div>
  )
}

export default UserInformation