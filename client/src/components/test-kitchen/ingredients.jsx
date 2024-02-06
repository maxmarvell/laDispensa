import { useState, useEffect } from "react";
import { deleteIterationIngredient, updateIterationIngredient, createManyIterationIngredients } from "../../api/test-kitchen"
import { useMutation } from "@tanstack/react-query"
import * as light from '../../assets/icons/light'


const measureSelections = [
  { name: 'g', value: 'G' },
  { value: 'KG', name: 'kg' },
  { value: 'CUP', name: 'cup' },
  { value: 'ML', name: 'mL' },
  { value: 'L', name: 'L' },
  { value: 'OZ', name: 'oZ' }
];


const ModifyIngredientField = ({ data, setNodes, setCurrentIngredients, setSelectOptions }) => {

  // Spread optional field from non-optional fields
  const { unit, ...rest } = data

  // Unpack useful constant variables
  const { iterationId, ingredientId } = rest;

  // Initialise state for input change
  const [ingredient, setIngredient] = useState(unit ? data : rest);


  // Delete the selected iterations ingredient field
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteIterationIngredient
  });

  // Update the selected iterations ingredient field
  const { mutateAsync: updateMutation } = useMutation({
    mutationFn: updateIterationIngredient
  });


  const handleUpdate = async () => {

    // Wait to update the ingredient
    await updateMutation({ ingredientId, iterationId, input: ingredient });

    // Update the global test-kitchen state
    setNodes((prev) => (prev.map(({ data, ...rest }) => {
      if (data.id === iterationId) {
        let { ingredients } = data;
        return { ...rest, data: { ...data, ingredients: ingredients.map(el => el.ingredientId === ingredientId ? ingredient : el) } };
      } else {
        return { ...rest, data };
      }
    })));

    // Remove the modification form
    setCurrentIngredients(prev => prev.filter(el => el.ingredientId !== ingredientId));

    // Re-add the option
    setSelectOptions(prev => [...prev, ingredient]);
  }


  const handleDelete = async () => {

    // Wait to update the ingredient
    await deleteMutation({ ingredientId, iterationId });

    // Update the global test-kitchen state
    setNodes((prev) => (prev.map(({ data, ...rest }) => {
      if (data.id === iterationId) {
        let { ingredients } = data
        return { ...rest, data: { ...data, ingredients: ingredients.filter(el => el.ingredientId !== ingredientId) } };
      } else {
        return { ...rest, data };
      }
    })));

    // Remove the modification form
    setCurrentIngredients(prev => prev.filter(el => el.ingredientId !== ingredientId));
  }


  const handleCancel = () => {

    // Remove the current form 
    setCurrentIngredients(prev => prev.filter(el => el.ingredientId !== ingredientId));

    // Re-add the option
    setSelectOptions(prev => [...prev, data]);
  }

  return (
    <div className="text-xs space-y-2">
      <div className="flex justify-evenly space-x-1">
        <div className="y-auto border-b border-slate-50 flex items-center text-center">
          {ingredient.ingredient.name}
        </div>
        <input
          type="number"
          value={ingredient.quantity}
          className="w-20 bg-transparent border-0 border-b border-slate-50"
          onChange={(e) => setIngredient(prev => ({ ...prev, quantity: e.target.value }))}
        />
        <select
          className="w-20 bg-transparent border-0 border-b border-slate-50"
          value={ingredient.unit || ""}
          onChange={(e) => setIngredient(({ unit, ...rest }) => {
            return e.target.value ? { ...rest, unit: e.target.value } : { ...rest }
          })}
        >
          <option value="">-</option>
          {measureSelections.map((el, index) => (<option key={index} value={el.value}>{el.name}</option>))}
        </select>
      </div>
      <div className="flex justify-evenly">
        <button
          className=""
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          className=""
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className=""
        >
          Delete
        </button>
      </div>
    </div>
  )
};


const AddIngredientField = ({ state, setNewIngredients }) => {
  return (
    <div className="flex justify-evenly space-x-1">
      <input
        className="w-20 bg-transparent border-0 border-b border-slate-50 focus:outline-none focus:border-orange-300"
        type='text'
        value={state.ingredient.name}
        onChange={(e) =>
          setNewIngredients(prev => {
            let newArr = [...prev];
            newArr[state.index] = { ...state, ingredient: { name: e.target.value } };
            return newArr;
          })
        }
        placeholder="ingredient"
      />
      <input
        className="w-20 bg-transparent border-0 border-b border-slate-50 focus:outline-none focus:border-orange-300"
        type="number"
        value={state.quantity}
        onChange={(e) =>
          setNewIngredients(prev => {
            let newArr = [...prev];
            newArr[state.index] = { ...state, quantity: e.target.value };
            return newArr;
          })
        }
        placeholder="quantity"
      />
      <select
        className="w-20 bg-transparent border-0 border-b border-slate-50 focus:outline-none focus:border-orange-300"
        type='text'
        value={state.unit || ""}
        onChange={(e) =>
          setNewIngredients(prev => {
            let newArr = [...prev];
            let { unit, ...rest } = state;
            newArr[state.index] = (e.target.value !== "") ? { ...rest, unit: e.target.value } : rest;
            return newArr;
          })
        }
      >
        <option value="">-</option>
        {measureSelections.map((el, index) => (<option key={index} value={el.value}>{el.name}</option>))}
      </select>
    </div>
  )
};


const Ingredients = ({ iteration, setNodes }) => {

  // Create a state to store the select options
  const [selectOptions, setSelectOptions] = useState(iteration.ingredients);

  const { id: iterationId } = iteration;

  // Set the selected option
  const [currentIngredients, setCurrentIngredients] = useState([])
  const handleOptionSelect = (e) => {

    // Remove selection choice and find the corresponding clicked element data
    setSelectOptions((arr) => (arr.filter(el => el.ingredientId !== e.target.value)));

    // Retrieve the ingredient from the iteration ingredients
    let ingredient = selectOptions.find(el => el.ingredientId === e.target.value);

    // Add the ingredient
    setCurrentIngredients((prev) => [...prev, ingredient])
  }

  // Reset Form onClick away
  useEffect(() => {
    setSelectOptions(iteration.ingredients);
    setCurrentIngredients([]);
    setNewIngredients([]);
  }, [iteration])

  // Allow users to be able to add ingredients
  // Use state for the new input fields
  const [newIngredients, setNewIngredients] = useState([]);
  const handleAddIngredient = () => {
    setNewIngredients((prev) => [...prev, {
      ingredient: {
        name: ""
      },
      quantity: "",
      index: newIngredients.length
    }]);
  };

  // Update the selected iterations ingredient field
  const { mutateAsync: createMutation } = useMutation({
    mutationFn: createManyIterationIngredients
  });

  const handleCreate = async () => {

    // Await the newly created ingredients
    let createdIngredients = await createMutation({
      input: newIngredients,
      iterationId,
    });

    // Reset the new ingredients form
    setNewIngredients([])

    // Update the global test-kitchen state
    setNodes((prev) => (prev.map(({ data, ...rest }) => {
      if (data.id === iterationId) {
        let { ingredients } = data;
        return { ...rest, data: { ...data, ingredients: [...ingredients, ...createdIngredients] } };
      } else {
        return { ...rest, data };
      }
    })));
  }


  return (
    <div className="flex flex-col">
      <label className="mt-5" htmlFor="ingredient-select">Modify Ingredients</label>
      <select
        className="border-0 border-b-2 border-slate-50 bg-transparent focus:outline-none focus:border-orange-300"
        value={""}
        onChange={(e) => handleOptionSelect(e)}
        id="ingredient-select"
      >
        <option value="">-</option>
        {selectOptions.map((el, index) => (
          <option key={index} value={el.ingredientId} className="capitalize">{el.ingredient.name}</option>
        ))}
      </select>
      <div className="space-y-2 mt-2">
        {
          currentIngredients.map((el, index) =>
            <ModifyIngredientField
              data={el}
              setNodes={setNodes}
              setCurrentIngredients={setCurrentIngredients}
              setSelectOptions={setSelectOptions}
              key={index}
            />
          )
        }
      </div>
      <div className="flex justify-between items-center mt-5 mb-2">
        <div className="text-center">Add ingredients</div>
        <button
          className="h-5 w-5 ml-2 rounded-sm my-auto"
          onClick={handleAddIngredient}
        >
          <img src={light.AddFill} alt="add ingredient" />
        </button>
      </div>
      <div className="space-y-4">
        {newIngredients.map(el =>
          <AddIngredientField
            state={el}
            setNewIngredients={setNewIngredients}
            key={el.index}
          />
        )}
      </div>
      {newIngredients.length ?
        <div className="flex justify-center mt-3">
          <button
            onClick={handleCreate}
            className="h-5 w-5"
          >
            <img src={light.Save} alt="save ingredients" />
          </button>
        </div>
        :
        null
      }
    </div>
  )
};


export default Ingredients