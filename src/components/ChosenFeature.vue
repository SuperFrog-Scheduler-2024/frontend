<template>
    <div id="chosenfeature">
        <div id="request-chosenfeature">
            <div>
                <Dropdown v-model="selectedFeature" :options="featureOptions" optionLabel="name"
                    placeholder="Select Feature Type" class="w-full md:w-14rem" />
            </div>
            <div>
                <SelectButton v-model="selectedOption" :options="options" optionLabel="name" multiple
                    aria-labelledby="multiple" />
            </div>
        </div>
        <div>
            <FloatLabel>
                <Textarea v-model="selectedFeatureDescription" rows="5" cols="30"
                    @input="updateSelectedFeatureDescription" />
                <label for="feature_description">Feature Description</label>

            </FloatLabel>
        </div>
        <Button label="Save" :disabled="isNextDisabled" @click="handleNextClick" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineEmits } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';

const selectedFeature = ref<string>('');
const selectedFeatureDescription = ref<string>('');
const selectedOption = ref<string[]>([]);
const isNextDisabled = ref(true);

const options = [
    { name: 'SuperFrog' },
    { name: 'Cheerleaders' },
    { name: 'Showgirls' }
];

const featureOptions = [
    { name: 'TCU' },
    { name: 'Public School/Non-Profit' },
    { name: 'Private/Residential' }
];

watchEffect(() => {
    isNextDisabled.value = !selectedFeature.value || !selectedFeatureDescription.value;
});

const handleNextClick = () => {
    if (!selectedFeature.value || !selectedFeatureDescription.value) {
        // Ensure all fields are selected
        return;
    }

    // Get the selected feature and feature description
    const selectedFeatureValue = selectedFeature.value;
    const selectedFeatureDescriptionValue = selectedFeatureDescription.value;

    // Emit the next-step event with the selected feature and feature description
    // emits['next-step']({ selectedFeature: selectedFeatureValue, selectedFeatureDescription: selectedFeatureDescriptionValue });
};

const updateSelectedFeature = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    selectedFeature.value = value;
};

const updateSelectedFeatureDescription = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    selectedFeatureDescription.value = value;
};

</script>

<style scoped>
#chosenfeature {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

#request-chosenfeature {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
}
</style>
