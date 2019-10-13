<template>
  <section class="form">
    <div class="form-content">
      <div v-if="submitted">
        <h2 aria-live="polite">Your Form has been submitted!</h2>
      </div>
      <div v-else>
        <h1>Create Account</h1>
        <h2>Vuelidate</h2>
        <form @submit.prevent="onSubmit" autocomplete="on">

          <!-- First Name -->
          <div class="input" :class="{invalid: $v.firstName.$error}">
            <label for="firstName">
              First Name (using @blur)
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              @blur="$v.firstName.$touch()"
              v-model="firstName"
              required
            />
            <p
              v-if="!$v.firstName.required && $v.firstName.$error"
              aria-live="assertive"
            >First name must be filled out</p>
            <p
              v-if="!$v.firstName.minLength && $v.firstName.$error"
              aria-live="assertive"
            >First name must have at least {{$v.firstName.$params.minLength.min}} characters</p>
            <p
              v-if="!$v.firstName.alpha && $v.firstName.$error"
              aria-live="assertive"
            >First name must only contain alphabetic characters</p>
          </div>

          <!-- Last Name -->
          <div class="input" :class="{invalid: $v.lastName.$error}">
            <label for="lastName">
              Last Name (using @input)
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              @input="$v.lastName.$touch()"
              v-model="lastName"
              required
            />
            <p
              v-if="!$v.lastName.required && $v.lastName.$error"
              aria-live="assertive"
            >Last name must be filled out</p>
            <p
              v-if="!$v.lastName.minLength && $v.lastName.$error"
              aria-live="assertive"
            >Last name must have at least {{$v.lastName.$params.minLength.min}} characters</p>
            <p
              v-if="!$v.lastName.alpha && $v.lastName.$error"
              aria-live="assertive"
            >Last name must only contain alphabetic characters</p>
          </div>

          <!-- Phone Number -->
          <div class="input" :class="{invalid: $v.phoneNumber.$error}">
            <label for="phoneNumber">
              Phone Number (touch() in button)
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber"
              v-model="phoneNumber"
              required
            />
            <button type="button" @click="$v.phoneNumber.$touch()">Validate Number</button>
            <p v-if="$v.phoneNumber.$error" aria-live="assertive">Must be valid number</p>
          </div>

          <!-- Email -->
          <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">
              Email
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              @blur="$v.email.$touch()"
              v-model="email"
              autocomplete="username email"
              required
            />
            <p v-if="!$v.email.email" aria-live="assertive">Must provide valid email</p>
          </div>

          <!-- Age -->
          <div class="input" :class="{invalid: $v.age.$error}">
            <label for="age">
              Your Age
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="number"
              name="age"
              id="age"
              @blur="$v.age.$touch()"
              v-model.number="age"
              required
            />

            <!-- Params will hold the params for the validator -->
            <p
              v-if="!$v.age.maxValue && $v.age.$error"
              aria-live="assertive"
            >Cannot have age over {{$v.age.$params.maxValue.max}}</p>
            <p v-if="!$v.age.minValue && $v.age.$error" aria-live="assertive">Must be over {{$v.age.$params.minValue.min}}</p>
            <p
              v-if="!$v.age.between && $v.age.$error"
              aria-live="assertive"
            >Age has to be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</p>
          </div>

          <!-- Password -->
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">
              Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              @blur="$v.password.$touch()"
              v-model="password"
              autocomplete="new-password"
              required
            />
            <p
              v-if="!$v.password.minLength && $v.password.$error"
              aria-live="assertive"
            >Password must be at least {{$v.password.$params.minLength.min}} characters long</p>
          </div>

          <!-- Password Confirmation -->
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">
              Confirm Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
              required
              autocomplete="new-password"
            />
            <p
              v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$error"
              aria-live="assertive"
            >Passwords must match</p>
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
                <label :for="secretQuestionInput.id">
                  Secret Question #{{ index+1 }}
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  :class="{invalid: $v.secretQuestionInputs.$each[index].$error}"
                  type="text"
                  :id="secretQuestionInput.id"
                  @blur="$v.secretQuestionInputs.$each[index].value.$touch()"
                  v-model="secretQuestionInput.value"
                  required
                />
                <p
                  v-if="$v.secretQuestionInputs.$each[index].value.$error"
                  aria-live="assertive"
                >Input must be at least {{$v.secretQuestionInputs.$each[index].value.$params.minLength.min}} characters long</p>
              </div>
              <br />
              <!-- Answers -->
              <div :class="{invalid: $v.secretQuestionInputs.$each[index].password.$error}">
                <label :for="secretQuestionInput.id + 'password'">
                  Secret Question #{{ index+1 }}'s Answer
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  :class="{invalid: $v.secretQuestionInputs.$each[index].$error}"
                  type="password"
                  :id="secretQuestionInput.id + 'password'"
                  @blur="$v.secretQuestionInputs.$each[index].password.$touch()"
                  v-model="secretQuestionInput.password"
                  required
                />
                <p
                  v-if="$v.secretQuestionInputs.$each[index].password.$error"
                  aria-live="assertive"
                >Password must be at least {{$v.secretQuestionInputs.$each[index].password.$params.minLength.min}} characters long</p>
              </div>
            </div>
            <p
              v-if="!$v.secretQuestionInputs.minLength"
              :class="{invalid: !$v.secretQuestionInputs.minLength}"
              aria-live="assertive"
            >You need at least {{$v.secretQuestionInputs.$params.minLength.min}} Secret Questions</p>
          </div>
          <!-- $iter present as direct child of $each objects -->
          <p
            v-if="!$v.secretQuestionInputs.$each.$iter[0]"
            aria-live="assertive"
          >You need at least {{$v.secretQuestionInputs.$params.minLength.min}} Secret Questions</p>

          <!-- Account Type -->
          <div class="input accountType">
            <label for="accountType">
              Account Type
              <span aria-hidden="true" class="required">*</span>
            </label>
            <select id="accountType" v-model="accountType">
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>

          <!-- Terms of Use -->
          <div class="input inline" :class="{invalid: $v.terms.$invalid}">
            <div>
              <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms" />
              <label for="terms">
                Accept Terms of Use
                <span v-if="$v.terms.$invalid" class="required" aria-label="required">*</span>
              </label>
            </div>

            <!-- Initials -->
            <div class="input" :class="{invalid: $v.initials.$invalid}">
              <label for="initials">
                Initials
                <span v-if="!$v.initials.required" class="required" aria-label="required">*</span>
              </label>
              <input type="text" id="initials" @blur="$v.initials.$touch()" v-model="initials" />
              <p
                v-if="!$v.initials.required && $v.initials.$error"
                aria-live="assertive"
              >Initials are needed</p>
            </div>
          </div>

          <!-- Submit -->
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {
  required,
  alpha,
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
      required,
      minLength: minLength(2),
      alpha
    },
    lastName: {
      required,
      minLength: minLength(2),
      alpha
    },
    phoneNumber: {
      required,
      minLength: minLength(14)
    },
    email: {
      required,
      email
    },
    age: {
      required,
      numeric,
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
      sameAs: sameAs("password") //match this to your data property name
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
    },
    accountType: {
      required
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
      // eslint-disable-next-line
      console.log("submittedData: ", submittedData);
      this.submitted = true;
    }
  }
};
</script>
