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
          <div class="input">
            <label for="firstName2">
              First Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="firstName2"
              v-model="firstName"
              required
            />
          </div>

          <!-- Last Name -->
          <div class="input">
            <label for="lastName2">
              Last Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="lastName2"
              v-model="lastName"
              required
            />
          </div>

          <!-- Phone Number -->
          <div class="input">
            <label for="phoneNumber2">
              Phone Number
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber2"
              v-model="phoneNumber"
              required
            />
          </div>

          <!-- Email -->
          <div class="input">
            <label for="email2">
              Email
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="email"
              id="email2"
              v-model="email"
              autocomplete="username email"
              required
            />
          </div>

          <!-- Age -->
          <div class="input">
            <label for="age2">
              Your Age
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="number"
              name="age"
              id="age2"
              v-model.number="age"
              required
            />
          </div>

          <!-- Password -->
          <div class="input">
            <label for="password2">
              Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="password2"
              v-model="password"
              autocomplete="new-password"
              required
            />
          </div>

          <!-- Password Confirmation -->
          <div class="input">
            <label for="confirm-password2">
              Confirm Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="confirm-password2"
              v-model="confirmPassword"
              required
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
                <label :for="secretQuestionInput.id + '2'">
                  Secret Question #{{ index+1 }}
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  type="text"
                  :id="secretQuestionInput.id + '2'"
                  v-model="secretQuestionInput.value"
                  required
                />
              </div>
              <br />
              <!-- Answers -->
              <div>
                <label :for="secretQuestionInput.id + 'password2'">
                  Secret Question #{{ index+1 }}'s Answer
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  type="password"
                  :id="secretQuestionInput.id + 'password2'"
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
            <select id="accountType2" v-model="accountType">
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>

          <!-- Terms of Use -->
          <div class="input inline">
            <div>
              <input type="checkbox" id="terms2" v-model="terms" />
              <label for="terms2">
                Accept Terms of Use
                <span class="required" aria-label="required">*</span>
              </label>
            </div>

            <!-- Initials -->
            <div class="input">
              <label for="initials2">
                Initials
                <span class="required" aria-label="required">*</span>
              </label>
              <input type="text" id="initials2" v-model="initials" />
            </div>
          </div>

          <!-- Submit -->
          <div class="submit">
            <button type="submit">Submit</button>
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
      this.submitted = true;
    }
  }
};
</script>
