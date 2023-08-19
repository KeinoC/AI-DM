'use client'

import { useState } from 'react'

import formData from './FormData'

export default function AddItemForm() {
  const [formType, setFormType] = useState(0)

  // function handleFormType(event) {
  //   setFormType(event.value)
  //   console.log(formType)
  // }

  return (
    <div>

      <br />Dynamic Form Component<br /><br />

      <form 
        // onChange={handleFormType(event)}
        >
        <input type="radio" id="weapons" name="form-type" value="0"/>
        <label for="weapons">Weapons</label>
        <input type="radio" id="items" name="form-type" value="1"/>
        <label for="items">Items</label>
      </form>
      
      <form>
        {formData[0].inputFields.map((formObj) => {
          return (
            <div>
              <label>
                {formObj.label}
              </label> &nbsp;
              <input 
                key={formObj.id}
                value={formObj.id}
                type={formObj.type} 
                placeholder={formObj.placeholder} />
            </div>
          )
        })}

        <button>Submit</button>
      </form>

    </div>
  )
}