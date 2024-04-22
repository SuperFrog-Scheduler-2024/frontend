<template>
    <main>
        <h1>Terms & Conditions</h1>
        <ul class="terms-and-conditions">
            <li>ALL Requests must be submitted at least 14 days prior to event date, and no earlier than 3 months
                out. The site will not permit requests outside these parameters.</li>
            <li>All requests must be submitted through the online request system. E-mailed requests are not
                considered.</li>
            <li>Submission of a request does NOT guarantee acceptance. TCU Spirit has until 5 days prior the date of
                the event to accept or decline a request.</li>
            <li>Prices are based on a 1 hour appearance – Additional fees may apply if more than one hour.</li>
            <li>ALL appearances are paid. We do not offer any free appearances.</li>
        </ul>
        <section class="pricing-info">
            <h2>Spirit Appearance Fees</h2>
            <DataTable show-gridlines :value="spiritFees" :responsive="true" class="custom-datatable">
                <Column field="appearanceType" header="Appearance Type"></Column>
                <Column field="fee" header="Fee"></Column>
            </DataTable>
        </section>

        <section v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="general-terms">
            <h2>General Terms:</h2>
            <ul>
                <li>Requests must be submitted at least 14 days prior to event date.</li>
                <li>TCU has until 5 days before the date of the appearance to accept or decline.</li>
                <li>Prices are based on a 1 hour event. Additional fees may apply if more than one hour.</li>
                <li>Appearances are only available in the DFW area.</li>
                <li>The SuperFrog suit will not be rented out to a third party.</li>
                <li>Due to university rules, TCU Spirit will not make appearances during dead (study) days, finals week,
                    or major holidays including, but not limited to, New Years Eve and Day, MLK Day, 4th of July,
                    Thanksgiving Day, Christmas Eve or Day.</li>
            </ul>
        </section>

        <section v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="contact-terms">
            <h2>Contact Terms:</h2>
            <p>Unless otherwise specified, the contact provided and their information will also serve as our Spirit
                Squad member’s point-of-contact on the date of the event.</p>
            <p>List the address and all other necessary information on the booking site.</p>
        </section>

        <section v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="event-terms">
            <h2>Event terms:</h2>
            <ul>
                <li>Submission of a request does not guarantee the event will be accepted. TCU Spirit has until 5 days
                    prior the date of the event to accept or decline a request.</li>
                <li>Even after an event is confirmed, it is still subjected to immediate cancellation due to a TCU
                    Athletic Department function, weather or an emergency. Immediate notice will be given in the event
                    of cancellation.</li>
                <li>Serious consideration is taken to each request to ensure it deems a positive reflection of TCU
                    Spirit and the University.</li>
                <li>Superfrog and TCU Spirit members are approved for University social media content only and not
                    available to request for any other content.</li>
            </ul>
        </section>

        <section v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="transportation-terms">
            <h2>Transportation Terms:</h2>
            <ul>
                <li>Must include mileage if location is more than 2 miles from TCU and include any parking
                    fees/expenses.</li>
                <li>If more than 2 miles from TCU, a $0.75 per mile transportation fee will be included in the
                    appearance total.</li>
                <li>6+ Spirit Squad members will require transportation to be booked to and from Fort Worth and paid for
                    by requestor.</li>
            </ul>
        </section>

        <section v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="payment-terms">
            <h2>Payment Terms:</h2>
            <ul>
                <li>All appearances are paid. We do not offer volunteer appearances.</li>
                <li>Payment should be submitted a minimum of 24 hours prior to event or it will be cancelled.</li>
                <li>You will be given a link for payment via credit card upon approval of your appearance through email.
                </li>
                <li>TCU Department Appearances are required to pay via a Fund Transfer Form: <a
                        href="https://vcfa.tcu.edu/accounting/">https://vcfa.tcu.edu/accounting/</a>. The completed form
                    and all required budget codes must be emailed to the individuals included in the appearance approval
                    e-mail to finalize request.</li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// Import other necessary PrimeVue components if used

const spiritFees = ref([
    { appearanceType: '30 minute SuperFrog appearance Flat Fee', fee: '$75' },
    { appearanceType: 'Texas Christian University On Campus', fee: '' },
    { appearanceType: 'SuperFrog', fee: '$100' },
    { appearanceType: 'Small Group of 2-3 Spirit Squad Members', fee: '$100' },
    { appearanceType: 'Large Group of 4-6 Spirit Squad Members', fee: '$150' },
    { appearanceType: 'Public Schools or Non-Profit', fee: '' },
    { appearanceType: 'SuperFrog', fee: '$100' },
    { appearanceType: 'Small Group of 2-3 Spirit Squad Members', fee: '$100' },
    { appearanceType: 'Large Group of 4-6 Spirit Squad Members', fee: '$150' },
    { appearanceType: 'Private or Residential', fee: '' },
    { appearanceType: 'SuperFrog', fee: '$175' },
    { appearanceType: 'Small Group of 2-3 Spirit Squad Members', fee: '$175' },
    { appearanceType: 'Large Group of 4-6 Spirit Squad Members', fee: '$200' },
]);
</script>

<style scoped>
main * {
    animation-duration: 1s;
}

.custom-datatable .p-datatable-header,
.custom-datatable .p-datatable-footer,
.custom-datatable .p-paginator,
.custom-datatable .p-datatable-tbody tr {
    background-color: #333;
    color: #fff;
}

section {
    margin-bottom: 2rem;
    /* Adjust as needed */
}

.terms-and-conditions {
    margin-bottom: 2rem;
}
</style>
