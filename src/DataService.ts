import { Column } from 'react-data-grid';
import { ScaleWorkerUnit } from './DataService';
import axios from 'axios';
import { AxiosResponse } from 'axios';

export interface ScaleWorkerUnit {
    id?: string;
    stampName?: string;
    workerName?: string;
    loadFactor?: string;
    lastModifiedTimeUtc?: string;
    isManager?: string;
    isStale?: string;
}

type Unit = 'unit';

const rootPath = 'https://scaleuxreact.azurewebsites.net/';
const workersPath = `${rootPath}api/workers`;
const workerPath = `${workersPath}/{id}`;
const addWorkerPath = `${workerPath}/add`;
const renewWorkerPath = `${workerPath}/renew`;
const pingWorkerPath = `${workerPath}/ping`;

export class DataService {
    static getWorkersColumns(): Column[] {
        return [
            {
                key: 'stampName',
                name: 'StampName',
                width: 200,
                editable: true,
                sortable: true
            }, {
                key: 'workerName',
                name: 'Worker Name',
                width: 200,
            }, {
                key: 'loadFactor',
                name: 'Load Factor',
                width: 120,
            }, {
                key: 'lastModifiedTimeUtc',
                name: 'Last Modified Time Utc',
                width: 300,
            }, {
                key: 'isManager',
                name: 'Is Manager',
                width: 100
            }, {
                key: 'isStale',
                name: 'Is Stale',
                width: 100
            }
        ];
    }

    static async getWorkers(): Promise<ScaleWorkerUnit[] | null> {
        const response = await axios.get(workersPath);
        return response.status === 200 ? response.data : response;
    }

    static async addWorker(managerId: string): Promise<ScaleWorkerUnit | AxiosResponse> {
        const response = await axios.post(addWorkerPath.replace('{id}', managerId));
        return response.status === 200 ? response.data : response;
    }

    static async renewWorker(workerId: string): Promise<ScaleWorkerUnit | AxiosResponse> {
        const response = await axios.post(renewWorkerPath.replace('{id}', workerId));
        return response.status === 200 ? response.data : response;
    }

    static async pingWorker(workerId: string): Promise<ScaleWorkerUnit | AxiosResponse> {
        const response = await axios.post(pingWorkerPath.replace('{id}', workerId));
        return response.status === 200 ? response.data : response;
    }

    static async removeWorker(workerId: string): Promise<Unit | AxiosResponse> {
        const response = await axios.delete(workerPath.replace('{id}', workerId));
        return response.status > 250 ? response : 'unit';
    }
}