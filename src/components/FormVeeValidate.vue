<template>
  <section class="form">
    <div class="form-content">
      <div v-if="submitted">
        <h2 aria-live="polite">Your Form has been submitted!</h2>
      </div>
      <div v-else>
        <h1>Create Account</h1>
        <h2>VeeValidate</h2>
        <form @submit.prevent="onSubmit" autocomplete="on">
          <!-- First Name -->
          <div class="input" :class="{invalid: errors.first('firstName')}">
            <label for="firstName2">
              First Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="firstName2"
              name="firstName"
              v-validate="'required|min:2|alpha'"
              v-model="firstName"
              required
            />
          </div>
          <!-- Last Name -->
          <div class="input" :class="{invalid: errors.first('lastName')}">
            <label for="lastName2">
              Last Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="lastName2"
              name="lastName"
              v-validate="'required|min:2|alpha'"
              v-model="lastName"
              required
            />
          </div>
          <!-- Phone Number -->
          <div class="input" :class="{invalid: errors.first('phoneNumber')}">
            <label for="phoneNumber2">
              Phone Number
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber2"
              name="phoneNumber"
              v-model="phoneNumber"
              v-validate="'required|min:14'"
              required
            />
          </div>
          <!-- Email -->
          <div class="input" :class="{invalid: errors.first('email')}">
            <label for="email2">Email</label>
            <input
              v-validate="'required|email'"
              type="email"
              name="email"
              id="email2"
              v-model="email"
              autocomplete="username email"
              required
            />
          </div>
          <!-- Age -->
          <div class="input" :class="{invalid: errors.first('age')}">
            <label for="age2">
              Your Age
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              v-validate="'required|numeric|between:18,120'"
              type="number"
              name="age"
              id="age2"
              v-model.number="age"
              required
            />
          </div>
          <!-- Password -->
          <div class="input" :class="{invalid: errors.first('password')}">
            <label for="password2">
              Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="password2"
              name="password"
              v-validate="{required: true, min:6}"
              v-model="password"
              autocomplete="new-password"
            />
          </div>
          <!-- Password Confirmation -->
          <div class="input" :class="{invalid: errors.first('confirmPassword')}">
            <label for="confirm-password2">
              Confirm Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="confirm-password2"
              name="confirmPassword"
              v-validate="{required: true, min:6, is:password}"
              v-model="confirmPassword"
              autocomplete="new-password"
            />
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
              <div>
                <label :for="secretQuestionInput.id">
                  Secret Question #{{ index+1 }}
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  type="text"
                  :name="'secretQuestionInput' + secretQuestionInput.id"
                  :id="secretQuestionInput.id"
                  v-validate="'required|min:2'"
                  v-model="secretQuestionInput.value"
                  required
                />
              </div>
              <br />
              <!-- Answers -->
              <div>
                <label :for="secretQuestionInput.id + 'password'">
                  Secret Question #{{ index+1 }}'s Answer
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  type="password"
                  :name="'password' + secretQuestionInput.id"
                  :id="'password' + secretQuestionInput.id"
                  v-validate="'required|min:6'"
                  v-model="secretQuestionInput.password"
                  required
                />
              </div>
            </div>
          </div>
          <!-- Account Type -->
          <div class="input accountType">
            <label for="accountType2">
              Account Type
              <span aria-hidden="true" class="required">*</span>
            </label>
            <select id="accountType2" v-model="accountType" ref="accountType" v-validate>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>
          <!-- Terms of Use -->
          <div class="input inline" :class="{invalid: errors.has('terms')}">
            <div>
              <input
                type="checkbox"
                name="terms"
                id="terms2"
                v-validate.immediate="'required_if:accountType,business'"
                v-model="terms"
              />
              <label for="terms2">
                Accept Terms of Use
                <span
                  v-if="errors.has('terms')"
                  class="required"
                  aria-label="required"
                >*</span>
              </label>
            </div>
            <!-- Initials -->
            <div class="input" :class="{invalid: errors.has('initials')}">
              <label for="initials2">
                Initials
                <span v-if="errors.has('initials')" class="required" aria-label="required">*</span>
              </label>
              <input
                type="text"
                name="initials"
                id="initials2"
                v-validate.immediate="'required_if:accountType,business'"
                v-model="initials"
              />
            </div>
          </div>
          <!-- Submit -->
          <div class="submit">
            <button type="submit" :disabled="!isFormDirty">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
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
  computed: {
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
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
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitted = true;
        }
      });
    }
  }
};
</script>