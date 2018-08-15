<template>
    <div class="form">
        <div class="card">
            <div class="card-header">Общие данные</div>
            <div class="card-block">
                <div class="row">
                    <div class="form-group col-sm-12">
                        <label>Название</label>
                        <input class="form-control" v-model="title">
                    </div>
                    <div class="form-group col-sm-12">
                        <label>Описание</label>
                        <textarea class="form-control" v-model="description"></textarea>
                    </div>
                    
                    <div class="form-group col-sm-12">
                        <label for="">Форма организации</label>
                        <select class="form-control" placeholder="Описание" v-model="type">
                            <option value="OOO">Общество с ограниченной ответственностью</option>
                            <option value="IP">Индивидуальный предприниматель</option>
                            <option value="PAO">Публичное акционерное общество</option>
                            <option value="MAO">Непубличное акционерное общество</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-header">Форма оплаты (НДС</div>
                    <div class="card-block">
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <select class="form-control" placeholder="НДС" v-model="nds">
                                    <option value="with">С НДС</option>
                                    <option value="without">Без НДС</option>
                                    <option value="both">Оба варианта</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Банковские данные (необязательно</div>
                    <div class="card-block">
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Название банка</label>
                                <input class="form-control" v-model="bankName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>БИК банка</label>
                                <masked-input class="form-control" v-model="bankBIK"  mask="111111111" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Рассчетный счет</label>
                                <masked-input class="form-control" v-model="bankNumber"  mask="11111111111111111111" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Кореспондентский счет</label>
                                <masked-input class="form-control" v-model="bankKS"  mask="11111111111111111111" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card" v-if="type">
                    <div class="card-header">Юридические контакты</div>
                    <div class="card-block">
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>ИНН</label>
                                <masked-input class="form-control" v-model="inn" mask="1111111111" />
                            </div>
                            <div class="form-group col-sm-12">

                                <label>КПП</label>
                                <masked-input class="form-control" v-model="kpp"  mask="111111111" />
                            </div>
                            <div v-if="type !== 'IP'" class="form-group col-sm-12">
                                <label>ОГРН</label>
                                <masked-input class="form-control" v-model="ogrn" mask="1111111111111" />
                            </div>
                            <div v-if="type === 'IP'" class="form-group col-sm-12">
                                <label>ОГРН ИП</label>
                                <masked-input class="form-control" v-model="ogrn"  mask="1111111111111" />
                            </div>
                            <div class="form-group col-sm-12">
                                <label>Юридический адрес</label>
                                <input class="form-control" v-model="legalAddress">
                            </div>
                            

                        </div>
                        <div v-if="type !== 'IP'" class="row">
                            
                            <div class="form-group col-sm-12">
                                <div class="form-check col-sm-12">
                                    
                                    <input class="form-check-input" type="checkbox" v-model="equalLegal" value="" id="equalLegal">
                                    <label class="form-check-label" for="equalLegal">
                                        Фактический адрес соответствует юридическому
                                    </label>  
                                </div>
                            </div>
                            <div v-if="equalLegal == 0" class="form-group col-sm-12">
                                <label>Фактический адрес</label>
                                <input class="form-control" v-model="factualAddress">
                            </div>

                            <div class="form-group col-sm-12">
                                <label>ФИО генерального директора</label>
                                <input class="form-control" v-model="manager">
                            </div>

                            <div class="form-group col-sm-12">
                                <div class="form-check col-sm-12">
                                    
                                    <input class="form-check-input" type="checkbox" v-model="equalManager" value="" id="equalManager">
                                    <label class="form-check-label" for="equalManager">
                                        ФИО генерального совпадает с ФИО главного бухгалтера
                                    </label>  
                                </div>
                            </div>
                            <div v-if="equalManager == 0" class="form-group col-sm-12">
                                <label>ФИО Главного бухгалтера</label>
                                <input class="form-control" v-model="booker">
                            </div>
                        </div>
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
  getterType: `company/getField`,
  mutationType: `company/updateField`
});

export default {
    components: {
        MaskedInput
    },
    created: () => {
        store.dispatch('company/get', null, { root: true });
    },
    computed: {
        ...mapFields([
            "id",
            "title",
            "description",
            "photo",
            "user_id",
            "created_at",
            "updated_at",
            "type",
            "nds",
            "inn",
            "kpp",
            "ogrn",
            "legalAddress",
            "factualAddress",
            "manager",
            "booker",
            "status",
            "equalLegal",
            "equalManager",
            "bankNumber",
            "bankName",
            "bankBIK",
            "bankKS",
            "bankINN",
            "bankKPP",

        ]),
  },
};
</script>