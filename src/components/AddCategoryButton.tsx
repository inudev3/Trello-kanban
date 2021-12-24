import React, {
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../model/atom";
import { SubmitHandler, useForm } from "react-hook-form";

type AddCategory = {
  category: string;
};
const AddCategoryButton: FunctionComponent = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, setFocus } = useForm<AddCategory>({
    mode: "onBlur",
  });
  const onClickAdd = () => {
    setFocus("category");
    setOpen(true);
  };
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setValue("category", "");
    }
  };
  const onValid: SubmitHandler<AddCategory> = ({ category }) => {
    if (category !== "") {
      if (Object.keys(todos).some((k) => k === category)) return;
      setTodos((prev) => ({ ...prev, [category]: [] }));
      setValue("category", "");
    }
    setOpen(false);
  };
  return (
    <form hidden={open} onSubmit={handleSubmit(onValid)}>
      <input
        type={"text"}
        {...register("category", { required: true })}
        onKeyDown={onKeyPress}
      />
    </form>
  );
};
export default AddCategoryButton;
