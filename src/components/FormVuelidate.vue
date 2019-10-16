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
          <div class="input">
            <label for="firstName">
              First Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              required
            />
          </div>

          <!-- Last Name -->
          <div class="input">
            <label for="lastName">
              Last Name
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              required
            />
          </div>

          <!-- Phone Number -->
          <div class="input">
            <label for="phoneNumber">
              Phone Number
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="tel"
              v-mask="'(###) ###-####'"
              id="phoneNumber"
              v-model="phoneNumber"
              required
            />
          </div>

          <!-- Email -->
          <div class="input">
            <label for="email">
              Email
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              autocomplete="username email"
              required
            />
          </div>

          <!-- Age -->
          <div class="input">
            <label for="age">
              Your Age
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="number"
              name="age"
              id="age"
              v-model.number="age"
              required
            />
          </div>

          <!-- Password -->
          <div class="input">
            <label for="password">
              Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              autocomplete="new-password"
              required
            />
          </div>

          <!-- Password Confirmation -->
          <div class="input">
            <label for="confirm-password">
              Confirm Password
              <span aria-hidden="true" class="required">*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
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
                <label :for="secretQuestionInput.id">
                  Secret Question #{{ index+1 }}
                  <span aria-hidden="true" class="required">*</span>
                </label>
                <input
                  type="text"
                  :id="secretQuestionInput.id"
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
                  :id="secretQuestionInput.id + 'password'"
                  v-model="secretQuestionInput.password"
                  required
                />
              </div>
            </div>
          </div>

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
          <div class="input inline">
            <div>
              <input type="checkbox" id="terms" v-model="terms" />
              <label for="terms">
                Accept Terms of Use
                <span class="required" aria-label="required">*</span>
              </label>
            </div>

            <!-- Initials -->
            <div class="input">
              <label for="initials">
                Initials
                <span class="required" aria-label="required">*</span>
              </label>
              <input type="text" id="initials" v-model="initials" />
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
