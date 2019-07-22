<template>
  <div class="form">
    <div class="form-content">
      <div v-if="submitted">
        <h2 aria-live="polite">Your Form has been submitted!</h2>
      </div>
      <div v-else>
        <h1>Create Account</h1>
        <h2>Vuelidate</h2>
        <form @submit.prevent="onSubmit" autocomplete="on">
          <!-- First Name -->
          <div class="input" :class="{invalid: errors.first('firstName')}">
            <label for="firstName2">First Name</label>
            <input
              type="text"
              id="firstName2"
              name="firstName"
              v-validate="'required|min:2|alpha'"
              v-model="firstName"
            />
            <p v-if="errors.has('firstName')">{{ errors.first('firstName') }}</p>
          </div>

          <!-- Last Name -->
          <div class="input" :class="{invalid: errors.first('lastName')}">
            <label for="lastName2">Last Name</label>
            <input
              type="text"
              id="lastName2"
              name="lastName"
              v-validate="'required|min:2|alpha'"
              v-model="lastName"
            />
            <span v-if="errors.has('lastName')">
              <h2>errors.collect</h2>
              <ul>
                <li v-for="(error, index) in errors.collect('lastName')" :key="index">{{ error }}</li>
              </ul>
              <h2>errors.all()</h2>
              <ul>
                <li v-for="(error, index) in errors.all()" :key="index">{{ error }}</li>
              </ul>
              <h2>errors.collect() & error in group</h2>
              <ul>
                <li v-for="(group, index) in errors.collect()" :key="index">
                  <ul>
                    <li v-for="(error, index2) in group" :key="index2">{{ error }}</li>
                  </ul>
                </li>
              </ul>
            </span>
          </div>

          <!-- Phone Number -->
          <!-- <div class="input" :class="{invalid: $v.phoneNumber.$error}">
            <label for="phoneNumber">Phone Number (touch() in button)</label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber"
              v-model="phoneNumber"
            />
            <button type="button" @click="$v.phoneNumber.$touch()">Validate Number</button>
            <p v-if="$v.phoneNumber.$error">Must be valid number</p>
          </div>-->

          <!-- Email -->
          <div class="input" :class="{invalid: errors.first('email')}">
            <label for="email2">Email</label>
            <input
              v-validate="'required|email'"
              type="email"
              name="email"
              id="email2"
              v-model="email"
            />
            <p>{{ errors.first('email') }}</p>
          </div>

          <!-- Age -->
          <!-- <div class="input" :class="{invalid: $v.age.$error}">
            <label for="age">Your Age</label>
            <input type="number" id="age" @blur="$v.age.$touch()" v-model.number="age" />
            <p
              v-if="!$v.age.maxValue && $v.age.$error"
            >Cannot have age over {{$v.age.$params.maxValue.max}}</p>
            <p v-if="!$v.age.minValue && $v.age.$error">Must be over {{$v.age.$params.minValue.min}}</p>
            <p
              v-if="!$v.age.between && $v.age.$error"
            >Age has to be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</p>
          </div>-->

          <!-- Password -->
          <div class="input" :class="{invalid: errors.first('password')}">
            <label for="password2">Password</label>
            <input
              type="password"
              id="password2"
              name="password"
              v-validate="'required|min:6'"
              v-model="password"
            />
            <p>{{ errors.first('password') }}</p>
          </div>

          <!-- Password Confirmation -->
          <!-- <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            />
            <p v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$error">Passwords must match</p>
          </div>-->

          <!-- Secret Questions -->
          <!-- <div class="secretQuestions">
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
          >x</button>-->
          <!-- Question -->
          <!-- <div :class="{invalid: $v.secretQuestionInputs.$each[index].value.$error}">
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
          <br>-->
          <!-- Password -->
          <!-- <div :class="{invalid: $v.secretQuestionInputs.$each[index].password.$error}">
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
          <p
            v-if="!$v.secretQuestionInputs.$each.$iter[0]"
          >You need at least {{$v.secretQuestionInputs.$params.minLength.min}} Secret Questions</p>-->

          <!-- Account Type -->
          <!-- <div class="input accountType">
            <label for="accountType">Account Type</label>
            <select id="accountType" v-model="accountType">
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>-->

          <!-- Terms of Use -->
          <!-- <div class="input inline" :class="{invalid: $v.terms.$invalid}">
            <div>
              <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms" />
              <label for="terms">Accept Terms of Use</label>
          </div>-->

          <!-- Initials -->
          <!-- <div class="input" :class="{invalid: $v.initials.$invalid}">
              <label for="initials">Initials</label>
              <input type="text" id="initials" @blur="$v.initials.$touch()" v-model="initials" />
              <p v-if="!$v.initials.required && $v.initials.$error">Initials are needed</p>
            </div>
          </div>-->

          <!-- Submit -->
          <div class="submit">
            <button type="submit" :disabled="errors.has('firstName')">Submit</button>
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
      this.$validator.validateAll().then(result => {
        console.log("result:", result);
        if (result) {
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
        console.log('error in completing form')
      });
    }
  }
};
</script>
