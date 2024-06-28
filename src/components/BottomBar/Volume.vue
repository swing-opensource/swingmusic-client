<template>
    <button class="speaker" @wheel.passive="handleMouseWheel">
        <div class="icon" @click="settings.toggleMute">
            <VolumeMuteSvg v-if="settings.mute || settings.volume == 0.0" />
            <VolumeMidSvg v-else-if="settings.volume > 0.75" />
            <VolumeLowSvg v-else-if="settings.volume > 0" />
        </div>
        <div class="dialog rounded-sm pad-sm">
            <input
                id="volume"
                type="range"
                name="volume"
                max="1"
                min="0"
                step="0.01"
                :value="settings.volume"
                @input="changeVolume"
                :style="{
                    backgroundSize: `${(settings.volume / 1) * 100}% 100%`,
                }"
            />
            <div className="volume_indicator">{{ ((settings.volume / 1) * 100).toFixed(0) }}</div>
        </div>
    </button>
</template>

<script setup lang="ts">
import VolumeLowSvg from '@/assets/icons/volume-low.svg'
import VolumeMidSvg from '@/assets/icons/volume-mid.svg'
import VolumeMuteSvg from '@/assets/icons/volume-mute.svg'
import useSettingsStore from '@/stores/settings'

const settings = useSettingsStore()

const changeVolume = (event: Event) => {
    const target = event.target as HTMLInputElement
    settings.setVolume(parseFloat(target.value))
}

const handleMouseWheel = (event: WheelEvent) => {
    const delta = event.deltaY / 1000
    let newVolume = settings.volume - delta / 3

    if (newVolume > 1) {
        newVolume = 1
    }

    if (newVolume < 0) {
        newVolume = 0
    }

    settings.setVolume(newVolume)
}
</script>

<style lang="scss">
.b-bar .right-group button.speaker {
    border-top: 1px solid transparent !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}

.speaker {
    position: relative;

    .icon {
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center;
    }

    svg {
        transform: scale(0.75);
    }

    .dialog {
        position: absolute;
        cursor: default;
        bottom: 56px;
        left: -1px;
        height: 48px;
        padding: 0 6px;
        display: flex;
        align-items: center;
        gap: 4px;
        background-color: $gray;
        border-top: 1px solid $gray3;
        border-bottom: 1px solid $gray3;
        border-right: 1px solid $gray3;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        -webkit-font-smoothing: antialiased;
        transform: rotate(270deg) translateX(-50%) perspective(1px);
        transform-origin: left top;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-out, visibility 0.2s ease-out;

        input {
            width: max-content;
            max-width: 87px;
            margin: 0;
            touch-action: pan-x;
            background: linear-gradient(to top, #ffffff, #ffffff) 0% 50% no-repeat, $gray4;

            &::-webkit-slider-thumb {
                height: 1rem;
                width: 1rem;
                cursor: pointer;
            }

            &::-moz-range-thumb {
                height: 1rem;
                width: 1rem;
                cursor: pointer;
            }
        }
    }

    &:hover {
        .dialog {
            opacity: 1;
            visibility: visible;
        }
    }

    .volume_indicator {
        font-weight: 600;
        width: 24px;
        height: 18px;
        transform: rotate(90deg) translate3d(0, 0, 0);
    }
}
</style>
