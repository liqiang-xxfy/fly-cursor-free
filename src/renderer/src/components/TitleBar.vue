<template>
    <div class="title-bar" @dblclick="handleDoubleClick">
        <div class="title-bar-container">
            <div class="title-bar-left">
                <img src="../assets/image/icon.png" alt="logo" class="logo" />
                <span class="title">Fly Cursor</span>
            </div>
            <div class="title-bar-right">
                <LanguageSwitcher />
                <div v-if="platform !== 'darwin'" class="window-controls">
                    <div class="control-button" @click.stop="minimizeWindow">
                        <img :src="minimizeIcon" alt="minimize" />
                    </div>
                    <div class="control-button" @click.stop="maximizeWindow">
                        <img :src="maximizeIcon" alt="maximize" />
                    </div>
                    <div class="control-button close-button" @click.stop="closeWindow">
                        <img :src="closeIcon" alt="close" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import minimizeIcon from "../assets/image/minus.svg";
    import maximizeIcon from "../assets/image/max.svg";
    import closeIcon from "../assets/image/close.svg";
    import LanguageSwitcher from './LanguageSwitcher.vue'; // Import LanguageSwitcher

    const platform = window.api.platform;
    const minimizeWindow = () => window.api.minimizeWindow();
    const maximizeWindow = () => window.api.maximizeWindow();
    const closeWindow = () => window.api.closeWindow();

    const handleDoubleClick = (event) => {
        // 确保双击事件不是来自控制按钮
        if (event.target.closest(".window-controls")) {
            return;
        }
        maximizeWindow();
    };
</script>

<style scoped lang="scss">
    .title-bar {
        color: var(--ev-c-text-1);
        -webkit-app-region: no-drag; /* 兼容Chromium内核 */
        app-region: no-drag; /* 更通用的属性，确保在不同环境中生效 */
        user-select: none;
        padding: 0 20px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);

        .title-bar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            -webkit-app-region: drag; /* 兼容Chromium内核 */
            app-region: drag; /* 更通用的属性，确保在不同环境中生效 */

            // // Windows下显示为一个可见的区域，帮助用户区分拖拽区
            // &::after {
            //     content: "";
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            //     right: 0;
            //     height: 100%;
            //     z-index: 1;
            //     pointer-events: none;
            //     opacity: 0.2;
            // }

            .title-bar-left {
                display: flex;
                align-items: center;
                position: relative;
                z-index: 2;

                .logo {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }

                .title {
                    font-weight: bold;
                }
            }

            .title-bar-right {
                display: flex;
                align-items: center;
                position: relative;
                z-index: 2;

                .window-controls {
                    display: flex;
                    -webkit-app-region: no-drag;
                    app-region: no-drag;

                    .control-button {
                        width: 30px;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        transition: background-color 0.2s;

                        &:hover {
                            background-color: #4a5056;
                            img {
                                width: 18px;
                                height: 18px;
                            }
                        }

                        &.close-button:hover {
                            background-color: #e81123;
                        }

                        img {
                            width: 14px;
                            height: 14px;
                            transition: all ease 0.1s;
                        }
                    }
                }
            }
        }
    }
</style>
