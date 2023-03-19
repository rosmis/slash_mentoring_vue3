<template>
    <ui-wrapper padded>
        <ui-level class="flex-col" vertical-align="top">
            <ui-title color="dark-blue"> FAQ </ui-title>

            <n-collapse>
                <n-collapse-item title="Quand les mentoras commencent-t-ils ? ">
                    <p>
                        Nos mentoras s’adresse à toute personne souhaitant
                        acquérir de nouvelles compétences . Vous n’avez pas
                        besoin de connaissances préalables. Votre mentor vous
                        guidera tout au long du programme structuré à l’aide
                        d’instructions simples, mais il vous incitera également
                        à aller au-delà du contenu du cours et à développer
                        votre créativité.
                    </p>
                </n-collapse-item>
            </n-collapse>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { NCollapse, NCollapseItem } from "naive-ui";
</script>
