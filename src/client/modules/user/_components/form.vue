<template>
    <div class="form">

        <div class="card">
            <div class="card-header">Личные данные</div>
            <div class="card-block">
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>ФИО</label>
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>Номер телефона</label>
                        <masked-input
                            class="form-control"
                            v-model="phone"
                            mask="\+\7 (111) 111-1111"/>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="form-group col-sm-6">
                        <label>EMail</label>
                        <input type="email" disabled class="form-control" v-model="email">
                    </div>
                    <!-- <div class="form-group col-sm-6">
                        <label>Новый пароль</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="password"/>
                    </div> -->
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">Паспортные данные</div>
            <div class="card-block">
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>Серия паспорта</label>
                        <masked-input class="form-control" v-model="series_of_passport" mask="1111" />
                    </div>
                    <div class="form-group col-sm-6">
                        <label>Номер паспорта</label>
                        <masked-input class="form-control" v-model="number_of_passport" mask="111111" />
                    </div>
                    <div class="form-group col-sm-6">
                        <label>Кем выдан</label>
                        <input type="text" class="form-control" v-model="issued">
                    </div> 
                    
                    <div class="form-group col-sm-3">
                        <label>Когда выдан</label>
                        <!-- <datetime class="form-group"
                            type="date"
                            :phrases="{ok: 'Установить', cancel: 'Отмена'}"
                            v-model="when"></datetime> -->
                    </div>
                    <div class="form-group col-sm-3">
                        <label>Код подразделения</label>
                        <masked-input class="form-control" v-model="code" mask="111-111" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script type="text/babel">
import { createHelpers } from "vuex-map-fields";
import { mapActions, mapGetters } from "vuex";

import MaskedInput from "vue-masked-input";
import store from "../../../store.js";

const { mapFields } = createHelpers({
  getterType: `user/getField`,
  mutationType: `user/updateField`
});

export default {
    components: {
        MaskedInput
    },
    
    beforeCreate: () => {
        store.dispatch('user/get', null, { root: true });
    },
    computed: {
        ...mapFields([
            "email", 
            "name", 
            "series_of_passport",
            "number_of_passport",
            "issued",
            "date",
            "code",
            "when",
            "phone",
        ]),
  },
};
</script>