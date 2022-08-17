import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useSelect from "../../hooks/useSelect.hook";
import { BiCategory } from "react-icons/bi";
import { fetchCategories } from "../../store/actions/category.actions";
import { useDispatch, useSelector } from "react-redux";

const CategoryInput = ({ data, setData, isInputValid, setIsInputValid }) => {
  const categoryList = useSelector((state) => state.category.categoryList);
  const dispatch = useDispatch();
  const {
    optionSelected: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useSelect(data, setData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setIsInputValid((isInputValid) => {
      return {
        ...isInputValid,
        category: selectedCategoryIsValid,
      };
    });
  }, [selectedCategoryIsValid, setIsInputValid]);

  const invalidContainer = " border border-red-400 py-[0.6rem]";

  const categoryDisplay = categoryList.map((category) => {
    return (
      <option value={category} className="bg-gray-100" key={category}>
        {category}
      </option>
    );
  });

  return (
    <div className="">
      <div
        className={twMerge(
          `flex items-center  bg-gray-100 px-2 py-3 focus-within:border focus-within:border-[color:var(--color-primary)] `,
          `${selectedCategoryHasError ? invalidContainer : ""}`
        )}
      >
        <BiCategory className="text-[color:var(--color-primary)] text-lg mx-1" />
        <select
          name="category"
          className={`text-gray-500 bg-gray-100 text-sm w-full outline-none cursor-context-menu `}
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          value={selectedCategory}
        >
          <option value="" className="bg-gray-100 " key="">
            Select Category
          </option>
          {categoryDisplay}
        </select>
      </div>
      {selectedCategoryHasError && (
        <p className="text-red-400 text-sm text-left py-1">
          Please select a category.
        </p>
      )}
    </div>
  );
};

export default CategoryInput;
