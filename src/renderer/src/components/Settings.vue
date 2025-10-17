<script setup>
    import { useAppStore } from "../stores/app.js";
    import { storeToRefs } from "pinia";
    import { ref, onMounted } from "vue";
    import { ElMessage } from "element-plus";
    import { useI18n } from 'vue-i18n'; // Import useI18n
    
    // Initialize i18n
    const { t } = useI18n();

    const formRef = ref(null);

    const rules = ref({
        EMAIL_DOMAIN: [{ required: true, message: t('settings.domainRequired'), trigger: "blur" }],
        RECEIVING_EMAIL: [
            { required: true, message: t('settings.emailRequired'), trigger: "blur" },
            { type: "email", message: t('settings.emailFormat'), trigger: ["blur", "change"] },
        ],
        RECEIVING_EMAIL_PIN: [{ required: true, message: t('settings.pinRequired'), trigger: "blur" }],
    });

    const appStore = useAppStore();
    const { appConfig } = storeToRefs(appStore);

    const localConfig = ref({
        EMAIL_DOMAIN: "",
        RECEIVING_EMAIL: "",
        RECEIVING_EMAIL_PIN: "",
    });

    const updateConfig = () => {
        if (appConfig.value) {
            localConfig.value = JSON.parse(JSON.stringify(appConfig.value));
            formRef.value.clearValidate();
        }
    };

    onMounted(() => {
        updateConfig();
    });

    defineExpose({
        updateConfig,
    });

    const saveConfig = async () => {
        if (!formRef.value) return;
        try {
            await formRef.value.validate();
        } catch {
            return;
        }

        const newConfig = JSON.parse(JSON.stringify(localConfig.value));

        try {
            let setResult = await window.api.setAppConfig(newConfig);
            if (setResult.success) {
                ElMessage.success(t('settings.saveSuccess'));
                await appStore.fetchAppConfig();
            } else {
                ElMessage.error(t('settings.saveFailed'));
            }
        } catch (error) {
            console.log("error1 :>> ", error);
            ElMessage.error(t('settings.saveFailed'));
        }
    };

    const openLink = (url) => {
        window.api.openExternalLink(url);
    };
</script>

<template>
    <div v-if="localConfig" class="settings-container">
        <el-form ref="formRef" :model="localConfig" :rules="rules" label-width="150px" style="max-width: 450px">
            <el-form-item :label="t('settings.domain')" prop="EMAIL_DOMAIN">
                <el-input v-model="localConfig.EMAIL_DOMAIN" :placeholder="t('settings.domainPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.receivingEmail')" prop="RECEIVING_EMAIL">
                <el-input v-model="localConfig.RECEIVING_EMAIL" :placeholder="t('settings.emailPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.emailPin')" prop="RECEIVING_EMAIL_PIN">
                <el-input v-model="localConfig.RECEIVING_EMAIL_PIN" :placeholder="t('settings.pinPlaceholder')" />
            </el-form-item>
            <el-form-item label="">
                <p class="open-link" @click.prevent="openLink('https://tempmail.plus')">
                    {{ t('settings.tempMailLink') }}
                </p>
            </el-form-item>
            <el-form-item label="">
                <p class="open-link" @click.prevent="openLink('https://www.bilibili.com/opus/951275934028136469')">
                    {{ t('settings.cloudflareTutorial') }}
                </p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveConfig">{{ t('settings.save') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-else>{{ t('settings.loading') }}</div>
</template>

<style scoped>
    .settings-container {
        padding: 20px;
    }
    .open-link {
        color: var(--el-color-primary);
        cursor: pointer;
        text-decoration: underline;
    }
    :deep(.el-form-item) {
        label {
            color: var(--ev-c-text-1);
        }
    }
</style>