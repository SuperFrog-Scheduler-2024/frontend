<script setup lang="ts">
import { ref, defineEmits} from 'vue';
import Checkbox from 'primevue/checkbox';

const emits = defineEmits(['next-step-disabled', 'next-step-enabled', 'update-policy-agreement']);

emits('next-step-disabled');

const selectedPolicyAgreement = ref<boolean>(false);

const updateSelectedPolicyAgreement = (value: boolean) => {
    if (!value) {
        emits('next-step-disabled');
        return;
    }
    emits('next-step-enabled');
    emits('update-policy-agreement', value);
};

</script>

<template>
    <div id="policyagreement">
        <div id="request-policyagreement">
            <div>
                <p>By submitting this form, I agree to the following policies:</p>
                <ul>
                    <li>Submission of a request does not guarantee the event will be accepted. TCU athletics takes priority over all other appearances.</li>
                    <li>TCU Spirit has until 5 days prior the date of the event to accept or decline a request.</li>
                    <li>Once approved via email, payment must be submitted a minimum of 24 hours prior to the event or it will be canceled.</li>
                    <li>Even after an event is confirmed, it is still subjected to immediate cancellation due to a TCU Athletic Department function, weather or an emergency. Immediate notice will be given in the event of cancellation.</li>
                    <li>The SuperFrog suit is NOT rented out to a third party.</li>
                </ul>
            </div>
            <div id="agree">
                <Checkbox v-model="selectedPolicyAgreement" :binary="true" inputId="checkbox" @update:modelValue="updateSelectedPolicyAgreement" />
                <label for="checkbox">I agree to the terms & conditions of a TCU Spirit Appearance.</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
#policyagreement {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

#request-policyagreement {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

#agree {
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>