<template>
  <div class="form">
    <div class="form-content">
      <div v-if="submitted">
        <h2 aria-live="polite">Your Form has been submitted!</h2>
      </div>
      <div v-else>
        <h1>Create Account</h1>
        <h2>Vuelidate</h2>
        <form @submit.prevent="onSubmit">
          <!-- 
        NOTES:

        invalid - input not valid
        dirty - whether or not user has touched the input
        error - true when dirty and invalid are true
        pending - currently evalutating validity of input (important for asynchrounous validations)
        params - list assigned validators
       
        Everything repeats for each validator and once more for overall form 

        @blur - once input loses focus
        @input - as user inputs

        Mask for phone Number - https://www.npmjs.com/package/v-mask
          -->

          <!-- First Name -->
          <div class="input" :class="{invalid: $v.firstName.$error}">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" @blur="$v.firstName.$touch()" v-model="firstName" />
            <p
              v-if="!$v.firstName.minLength"
            >First name must have at least {{$v.firstName.$params.minLength.min}} characters</p>
          </div>

          <!-- Last Name -->
          <div class="input" :class="{invalid: $v.lastName.$error}">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" @blur="$v.lastName.$touch()" v-model="lastName" />
            <p
              v-if="!$v.lastName.minLength"
            >First name must have at least {{$v.lastName.$params.minLength.min}} characters</p>
          </div>

          <!-- Phone Number -->
          <div class="input" :class="{invalid: $v.phoneNumber.$error}">
            <label for="phoneNumber">Phone Number</label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber"
              @blur="$v.phoneNumber.$touch()"
              v-model="phoneNumber"
            />
            <p v-if="!$v.phoneNumber.minLength">Must be valid number</p>
          </div>

          <!-- Mail -->
          <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">Email</label>
            <!-- $v reserved word for the vuelidate package. Gives us access to validators and valitators rules / behind the scenes valiations vuelidate does -->
            <!-- call method of touch which is automatically exposed and added by the vuelidate package. -->

            <input type="email" id="email" @blur="$v.email.$touch()" v-model="email" />
            <p v-if="!$v.email.email">Must provide valid email</p>
          </div>

          <!-- Mail -->
          <div class="input" :class="{invalid: $v.email2.$error}">
            <label for="email2">Email</label>
            <!-- $v reserved word for the vuelidate package. Gives us access to validators and valitators rules / behind the scenes valiations vuelidate does -->
            <!-- call method of touch which is automatically exposed and added by the vuelidate package. -->
            <input type="email" id="email2" @input="$v.email2.$touch()" v-model="email2" />
            <p v-if="!$v.email2.email">Must provide valid email</p>
          </div>

          <!-- Mail -->
          <div class="input" :class="{invalid: $v.email3.$error}">
            <label for="email3">Email with button for touch</label>
            <!-- $v reserved word for the vuelidate package. Gives us access to validators and valitators rules / behind the scenes valiations vuelidate does -->
            <!-- call method of touch which is automatically exposed and added by the vuelidate package. -->

            <input type="email" id="email3" v-model="email3" />
            <!-- You can always bind the touch to trigger validation outside of the input to evalutate input -->
            <button type="button" @click="$v.email3.$touch()">Enter</button>
            <p v-if="!$v.email3.email">Must provide valid email</p>
          </div>

          <!-- Age -->
          <div class="input" :class="{invalid: $v.age.$error}">
            <label for="age">Your Age</label>
            <input type="number" id="age" @blur="$v.age.$touch()" v-model.number="age" />

            <!-- Params will hold the params for the validator -->
            <p
              v-if="!$v.age.maxValue && $v.age.$error"
            >Cannot have age over {{$v.age.$params.maxValue.max}}</p>
            <p v-if="!$v.age.minValue && $v.age.$error">Must be over {{$v.age.$params.minValue.min}}</p>
            <p
              v-if="!$v.age.between && $v.age.$error"
            >Age has to be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</p>
          </div>

          <!-- Password -->
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">Password</label>
            <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" />
            <p
              v-if="!$v.password.minLength && $v.password.$error"
            >Password must be at least {{$v.password.$params.minLength.min}} characters long</p>
          </div>

          <!-- Password Confirmation -->
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            />
            <p v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$error">Passwords must match</p>
          </div>

          <!-- Secret Questions -->
          <div class="secretQuestions">
            <button @click="onAddSecretQuestion" type="button">Add Secret Question</button>
            <div
              class="input question"
              v-for="(secretQuestionInput, index) in secretQuestionInputs"
              :key="secretQuestionInput.id"
            >
              <button
                class="delete"
                @click="onDeleteSecretQuestion(secretQuestionInput.id)"
                type="button"
                :aria-label="'Delete Secret Question number ' + (index+1)"
              >x</button>
              <!-- Question -->
              <div :class="{invalid: $v.secretQuestionInputs.$each[index].value.$error}">
                <label :for="secretQuestionInput.id">Secret Question #{{ index+1 }}</label>
                <input
                  :class="{invalid: $v.secretQuestionInputs.$each[index].$error}"
                  type="text"
                  :id="secretQuestionInput.id"
                  @blur="$v.secretQuestionInputs.$each[index].value.$touch()"
                  v-model="secretQuestionInput.value"
                />
                <p
                  v-if="$v.secretQuestionInputs.$each[index].value.$error"
                >Input must be at least {{$v.secretQuestionInputs.$each[index].value.$params.minLength.min}} characters long</p>
              </div>
              <br>
              <!-- Password -->
              <div :class="{invalid: $v.secretQuestionInputs.$each[index].password.$error}">
                <label
                  :for="secretQuestionInput.id + 'password'"
                >Secret Question #{{ index+1 }}'s Password</label>
                <input
                  :class="{invalid: $v.secretQuestionInputs.$each[index].$error}"
                  type="password"
                  :id="secretQuestionInput.id + 'password'"
                  @blur="$v.secretQuestionInputs.$each[index].password.$touch()"
                  v-model="secretQuestionInput.password"
                />
                <p
                  v-if="$v.secretQuestionInputs.$each[index].password.$error"
                >Password must be at least {{$v.secretQuestionInputs.$each[index].password.$params.minLength.min}} characters long</p>
              </div>
            </div>
            <p
              v-if="!$v.secretQuestionInputs.minLength"
              :class="{invalid: !$v.secretQuestionInputs.minLength}"
            >You need at least {{$v.secretQuestionInputs.$params.minLength.min}} Secret Questions</p>
          </div>
          <!-- $iter present as direct child of $each objects -->
          <p
            v-if="!$v.secretQuestionInputs.$each.$iter[0]"
          >You need at least {{$v.secretQuestionInputs.$params.minLength.min}} Secret Questions</p>

          <!-- Account Type -->
          <div class="input accountType">
            <label for="accountType">Account Type</label>
            <select id="accountType" v-model="accountType">
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>

          <!-- Terms of Use -->
          <div class="input inline" :class="{invalid: $v.terms.$invalid}">
            <div>
              <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms" />
              <label for="terms">Accept Terms of Use</label>
            </div>

            <!-- Initials -->
            <div class="input" :class="{invalid: $v.initials.$invalid}">
              <label for="initials">Initials</label>
              <input type="text" id="initials" @blur="$v.initials.$touch()" v-model="initials" />
              <p v-if="!$v.initials.required && $v.initials.$error">Initials are needed</p>
            </div>
          </div>

          <!-- Submit -->
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  numeric,
  minValue,
  maxValue,
  between,
  minLength,
  sameAs,
  requiredUnless
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      email2: "",
      email3: "",
      age: null,
      password: "",
      confirmPassword: "",
      accountType: "personal",
      secretQuestionInputs: [],
      terms: false,
      initials: "",
      submitted: false
    };
  },
  validations: {
    firstName: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      minLength: minLength(2)
    },
    lastName: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      minLength: minLength(2)
    },
    phoneNumber: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      minLength: minLength(14)
    },
    email: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      email // valid email
    },
    email2: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      email // valid email
    },
    email3: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      email // valid email
    },
    age: {
      // has to have same name as the property you are binding to with v-model to automatially synchronize and know when value changes
      required, // not empty
      numeric, // it is a number
      minValue: minValue(18),
      maxValue: maxValue(120),
      between: between(18, 120)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      //match this to your data property name
      sameAs: sameAs("password")
    },
    terms: {
      required,
      checked(val) {
        return this.accountType === "personal" ? true : val;
      }
    },
    initials: {
      required: requiredUnless(vm => {
        return vm.accountType === "personal";
      })
    },
    accountType: {
      required
    },
    // Validating Arrays
    secretQuestionInputs: {
      minLength: minLength(2),
      // $each is a placeholder for all dynamic elements we can add to the array
      $each: {
        value: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
  },
  methods: {
    onAddSecretQuestion() {
      const newSecretQuestion = {
        id: Math.random() * Math.random() * 1000,
        value: "",
        password: ""
      };
      this.secretQuestionInputs.push(newSecretQuestion);
    },
    onDeleteSecretQuestion(id) {
      this.secretQuestionInputs = this.secretQuestionInputs.filter(
        secretQuestion => secretQuestion.id !== id
      );
    },
    onSubmit() {
      const submittedData = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        age: this.age,
        password: this.password,
        confirmPassword: this.confirmPassword,
        accountType: this.accountType,
        secretQuestions: this.secretQuestionInputs.map(
          secretQuestion => secretQuestion.value
        ),
        terms: this.terms,
        initials: this.initials
      };
      console.log("submittedData: ", submittedData);
      this.submitted = true;
    }
  }
};
</script>

<style lang="scss">
// Form
.form {
  max-width: 400px;
  margin: 3em auto;
  .form-content {
    border: 1px solid #eaeaea;
    padding: 0 2em 2em;
    -webkit-box-shadow: 4px 3px 17px -2px rgba(143, 143, 143, 0.6);
    -moz-box-shadow: 4px 3px 17px -2px rgba(143, 143, 143, 0.6);
    box-shadow: 4px 3px 17px -2px rgba(143, 143, 143, 0.6);
  }
}

// Inputs
.input {
  margin: 1em auto;

  label {
    display: block;
    font-weight: bold;
    text-align: left;
    margin: 0 0 0.5em;
  }

  input {
    font: inherit;
    width: 100%;
    padding: 0.4em 0.8em;
    box-sizing: border-box;
    border: 1px solid #cecece;

    &:focus {
      outline-color: #88f7a2;
      border: 1px solid #0b120c;
    }
  }

  select {
    font: inherit;
    border: 1px solid #cecece;
    background-color: #f5f3f3;
    border-radius: 4px;
    padding: 0.2em;
    text-align-last: center;

    &:focus {
      outline-color: #88f7a2;
      border: 1px solid #0b120c;
    }
  }

  #initials {
    max-width: 60px;
    padding: 0;
    margin: 0 .5em;
    text-align: center;
  }
}

.inline {
  margin: auto;
  label {
    display: inline;
  }
  input {
    width: auto;
  }
}

.invalid {
  color: #b50000;
  label {
    color: #b50000;
  }
  input {
    border: 1px solid #b50000;
    background-color: #f7e9e9;
  }
}

// Secret Questions
.secretQuestions,
.submit {
  button {
    font: inherit;
    cursor: pointer;
    border: 1px solid #0b120c;
    border-radius: 4px;
    padding: 5px;
    background: #afead0;
    // -webkit-box-shadow: 4px 7px 7px -9px rgba(135,135,135,1);
    // -moz-box-shadow: 4px 7px 7px -9px rgba(135,135,135,1);
    // box-shadow: 4px 7px 7px -9px rgba(135,135,135,1);

    &:hover,
    &:active {
      background-color: #41b883;
    }
  }
}

.question{
  border: 1px solid #cecece;
  padding: 1em .5em;
  position: relative;

  button.delete {
    margin: .5em;
    padding: 1px 8px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
}

.accountType{
  display: inline-block
}

.submit {
  button[disabled],
  button[disabled]:hover,
  button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
}


</style>

