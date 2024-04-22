<template>
    <div id="chosenfeature">
        <div id="request-chosenfeature">
            <div>
                <Dropdown v-model="selectedFeatureType" :options="featureOptions" optionLabel="name" @update:model-value="updateSelectedFeatureType"
                    placeholder="Select Feature Type" class="w-full md:w-14rem" />
            </div>
            <div>
                <SelectButton v-model="selectedFeatureStaff" :options="staffOptions" optionLabel="name" multiple
                    @update:model-value="updateSelectedFeatureStaff" aria-labelledby="multiple"  />
            </div>
        </div>
        <div>
            <FloatLabel>
                <Textarea v-model="selectedFeatureDescription" rows="5" cols="30"
                    @input="updateSelectedFeatureDescription" />
                <label for="feature_description">Feature Description</label>

            </FloatLabel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import SelectButton from 'primevue/selectbutton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';

const emits = defineEmits(['next-step-disabled', 'next-step-enabled', 'update-feature-staff', 'update-feature-type', 'update-feature-description']);

emits('next-step-disabled');

const selectedFeatureType = ref<string>('');
const selectedFeatureStaff = ref<string[]>([]);
const selectedFeatureDescription = ref<string>('');

const staffOptions = [
    { name: 'SuperFrog' },
    { name: 'Cheerleaders' },
    { name: 'Showgirls' }
];

const featureOptions = [
    { name: 'TCU' },
    { name: 'Public School/Non-Profit' },
    { name: 'Private/Residential' }
];

const updateSelectedFeatureType = (event: Event) => {
    // selectedFeatureType.value = selectedFeatureType.value.name;
    // console.log(selectedFeatureType.value);
};

const updateSelectedFeatureStaff = (event: Event) => {
    // selectedFeatureStaff.value = selectedFeatureStaff.value.map((staff) => staff.name);
    // console.log(selectedFeatureStaff.value);
};

const updateSelectedFeatureDescription = (event: Event) => {
    // selectedFeatureDescription.value = selectedFeatureDescription.value;
    // console.log(selectedFeatureDescription.value);
    if (selectedFeatureType.value && selectedFeatureStaff.value.length > 0 && selectedFeatureDescription.value) {
        emits('next-step-enabled');
        emits('update-feature-type', selectedFeatureType.value);
        emits('update-feature-staff', selectedFeatureStaff.value);
        emits('update-feature-description', selectedFeatureDescription.value);
    }
};

</script>

<style scoped>
#chosenfeature {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
