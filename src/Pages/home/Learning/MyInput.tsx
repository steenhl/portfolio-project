import { useRef } from "react";

type myInputType ={
	onAddTodo:(todoText:string)=>void
}

export const MyInput: React.FC<myInputType> = (props) => {
	// props.onAddTodo(enteredText);
	const inputText = useRef<HTMLInputElement>(null)

	const todoSubmitHandler=(event:React.FormEvent)=>{
		event.preventDefault()
		const enteredText = inputText.current!.value
		// console.log(enteredText)
		props.onAddTodo(enteredText)
	}
	
	return(
		<form onSubmit={todoSubmitHandler} className="myform">
			<label>skrive her</label>
			<input type="text" ref={inputText} placeholder="skrive her" />
		</form> 
		)
	};
