import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { postSignUp } from "../apiCalls";

const schema = yup.object({
	userName: yup.string().min(5).max(50).required('Required'),
	email: yup.string().email().max(50),
	password: yup.string().min(8).max(16),
	passwordConfirmation: yup.string().min(8).max(16)
}).required();

const Signup = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onFinalSubmission = async (data) => {
		if (data.password != data.passwordConfirmation) {
			toast("Passwords not matching", {
				type: "error",
				theme: 'colored'
			})
			return
		}

		try {
			const response = await postSignUp({
				name: data.userName,
				email: data.email,
				password: data.password
			});
			toast("You've registered successfully! Login now!", {
				type: "success",
				theme: 'colored'
			})
			setTimeout(() => {
				window.location.href = "/login"
			}, 2000)
		} catch (error) {
			const message = error?.response?.data?.message || "Something went wrong";
			toast(message, {
				type: "error",
				theme: 'colored'
			})
		}
	}

	console.log("errors", errors);
	console.log("watching name", watch("userName"))

	return (
		<div style={{ width: 500 }}>
			<h1>Signup Form</h1>
			<form onSubmit={handleSubmit(onFinalSubmission)}>
				<div class="form-group">
					<label>Name</label>
					<input className="form-control" type="text" {...register("userName")} />
					<small class="form-text text-danger">{errors["userName"]?.message}</small>
				</div>
				<div class="form-group">
					<label>Email address</label>
					<input className="form-control" type="email" {...register("email")} />
					<small class="form-text text-danger">{errors["email"]?.message}</small>
				</div>
				<div class="form-group">
					<label>Password</label>
					<input className="form-control" type="password" {...register("password")} />
				</div>
				<div class="form-group">
					<label>Confirm Password</label>
					<input className="form-control" type="password" {...register("passwordConfirmation")} />
					<small class="form-text text-danger">{errors["passwordConfirmation"]?.message}</small>
				</div>
				<input type="submit" className="btn btn-primary" style={{ margin: 20 }} />
			</form>
			Already has an account? <a href="/login">Login Here</a>
		</div>
	)
}

export default Signup;