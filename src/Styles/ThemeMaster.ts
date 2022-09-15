// const light = '#FFF9D7';
// const dark = '#610C63';
// const offDark = '#810955';
// const offLight = '#EE81B3';

const light = '#7858A6';
const dark = '#371B58';
const offDark = '#4C3575';
const offLight = '#5B4B8A';

export const ThemeMaster = {
    'global': {
        'colors': {
            'background': {'light':light, 'dark':dark},
            'offBackground': {'light':offLight, 'dark':offDark},
            'reverseBackground': {'light':dark, 'dark':light},
            'reverseOffBackground': {'light':offDark, 'dark':offLight},
            'text': {'light':dark, 'dark':light},
        }
    },
    'font': {
        'family': 'monospace',
        'color': {'light':dark, 'dark':light}
    }
}