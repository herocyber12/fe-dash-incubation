import axios from 'axios';
import { useUserStore } from '../stores/user';

// const API_BASE_URL = 'http://100.109.71.80:8089/';
const API_BASE_URL = 'https://go.protowa.id/';
const user = useUserStore();

async function fetchData(uriUrl: string, payload: Record<string, any> = {}, method: 'get' | 'post' = 'get') {
    try {
        let header: Record<string, string> = {};

        if (method === 'post') {
            header = {
                'Content-Type': 'application/json',
            };
        } 

        const response = await axios({
            method,
            url: `${API_BASE_URL}${uriUrl}`,
            headers: header,
            params: method === 'get' ? payload : undefined,
            data: method === 'post' ? payload : undefined,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getLampStatus(): Promise<{ status: string }> {
        return await fetchData('lamp-status/latest', {
            deviceKey: user.deviceKey
        }, 'post');
}

async function updateSettings(minTemp: Float64Array, maxTemp: Float64Array, targetNotif: string): Promise<void> {
    await fetchData('update/config-device', {
        deviceKey: user.deviceKey,
        minTemperature: minTemp,
        maxTemperature: maxTemp,
        waNotify: targetNotif
    }, 'post');
}

async function getConfigDevice(): Promise<{ success : boolean, min_temperature: Float64Array, max_temperature: Float64Array, wa_notify: String, lamp_status: String}> {
    return await fetchData('get-config-device', {
        deviceKey: user.deviceKey
    }, 'post');
}

function getRealTimeTemperature(): EventSource
{
    const deviceKey = user.deviceKey;
    const eventSource = new EventSource(`${API_BASE_URL}stream-temp/${deviceKey}`);

    return eventSource;
}

export default {
    getRealTimeTemperature,
    getLampStatus,
    updateSettings,
    getConfigDevice
}
