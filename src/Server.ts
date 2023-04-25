import { RDM_Device } from "./RDM_Device";

export type DeviceFullDataCallback = (device: RDM_Device) => void

export interface ServerParam {
    device_added_callback: DeviceFullDataCallback
    device_updated_callback: DeviceFullDataCallback
}

export class Server {
    private m_Counter: number = 1;
    private m_Devices: Array<RDM_Device> = [];

    constructor(private _param: ServerParam) {
        document.getElementById("add_1").onclick = () => {
            this.AddDevices(1)
        }
        document.getElementById("add_10").onclick = () => {
            this.AddDevices(10)
        }
        document.getElementById("add_100").onclick = () => {
            this.AddDevices(100)
        }
        document.getElementById("add_1000").onclick = () => {
            this.AddDevices(1000)
        }
        document.getElementById("all_online").onclick = () => {
            for (var i = 0; i < this.m_Devices.length; i++) {
                var device = this.m_Devices[i]
                if (device.is_online != true) {
                    device.is_online = true
                    this._param.device_updated_callback(device)
                }
            }
        }
        document.getElementById("all_offline").onclick = () => {
            for (var i = 0; i < this.m_Devices.length; i++) {
                var device = this.m_Devices[i]
                if (device.is_online != false) {
                    device.is_online = false
                    this._param.device_updated_callback(device)
                }
            }
        }
        document.getElementById("random_online").onclick = () => {
            for (var i = 0; i < this.m_Devices.length; i++) {
                var device = this.m_Devices[i]
                const random_state = Math.random() > 0.5
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    this._param.device_updated_callback(device)
                }
            }
        }
        document.getElementById("all_update").onclick = () => {
            var update_list: Array<RDM_Device> = []
            for (var i = 0; i < this.m_Devices.length; i++) {
                var device = this.m_Devices[i]
                var updated = false
                const random_state = Math.random() > 0.5
                const random_address = Math.floor((Math.random() * 511)) + 1
                const random_mode = Math.floor((Math.random() * 15))
                const change_label = Math.random() > 0.75
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    updated = true
                }
                if (device.address != random_address) {
                    device.address = random_address
                    updated = true
                }
                if (device.mode_index != random_mode) {
                    device.mode_index = random_mode
                    updated = true
                }
                if (change_label) {
                    device.label = "Random Label " + Math.floor(Math.random() * 1000)
                    updated = true
                }
                if (updated) {
                    update_list.push(device)
                }
            }

            for (var i = 0; i < update_list.length; i++) {
                this._param.device_updated_callback(update_list[i])
            }
        }
        document.getElementById("first_10_update").onclick = () => {
            var update_list: Array<RDM_Device> = []
            for (var i = 0; i < Math.min(this.m_Devices.length, 10); i++) {
                var device = this.m_Devices[i]
                var updated = false
                const random_state = Math.random() > 0.5
                const random_address = Math.floor((Math.random() * 511)) + 1
                const random_mode = Math.floor((Math.random() * 15))
                const change_label = Math.random() > 0.75
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    updated = true
                }
                if (device.address != random_address) {
                    device.address = random_address
                    updated = true
                }
                if (device.mode_index != random_mode) {
                    device.mode_index = random_mode
                    updated = true
                }
                if (change_label) {
                    device.label = "Random Label " + Math.floor(Math.random() * 1000)
                    updated = true
                }
                if (updated) {
                    update_list.push(device)
                }
            }

            for (var i = 0; i < update_list.length; i++) {
                this._param.device_updated_callback(update_list[i])
            }
        }
        document.getElementById("first_100_update").onclick = () => {
            var update_list: Array<RDM_Device> = []
            for (var i = 0; i < Math.min(this.m_Devices.length, 100); i++) {
                var device = this.m_Devices[i]
                var updated = false
                const random_state = Math.random() > 0.5
                const random_address = Math.floor((Math.random() * 511)) + 1
                const random_mode = Math.floor((Math.random() * 15))
                const change_label = Math.random() > 0.75
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    updated = true
                }
                if (device.address != random_address) {
                    device.address = random_address
                    updated = true
                }
                if (device.mode_index != random_mode) {
                    device.mode_index = random_mode
                    updated = true
                }
                if (change_label) {
                    device.label = "Random Label " + Math.floor(Math.random() * 1000)
                    updated = true
                }
                if (updated) {
                    update_list.push(device)
                }
            }

            for (var i = 0; i < update_list.length; i++) {
                this._param.device_updated_callback(update_list[i])
            }
        }
        document.getElementById("random_update_50").onclick = () => {
            var update_list: Array<RDM_Device> = []
            for (var i = 0; i < this.m_Devices.length; i++) {
                if (Math.random() > 0.5)
                    continue

                var device = this.m_Devices[i]
                var updated = false
                const random_state = Math.random() > 0.5
                const random_address = Math.floor((Math.random() * 511)) + 1
                const random_mode = Math.floor((Math.random() * 15))
                const change_label = Math.random() > 0.75
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    updated = true
                }
                if (device.address != random_address) {
                    device.address = random_address
                    updated = true
                }
                if (device.mode_index != random_mode) {
                    device.address = random_mode
                    updated = true
                }
                if (change_label) {
                    device.label = "Random Label " + Math.floor(Math.random() * 1000)
                    updated = true
                }
                if (updated) {
                    update_list.push(device)
                }
            }

            for (var i = 0; i < update_list.length; i++) {
                this._param.device_updated_callback(update_list[i])
            }
        }
        document.getElementById("random_update_2").onclick = () => {
            var update_list: Array<RDM_Device> = []
            for (var i = 0; i < this.m_Devices.length; i++) {
                if (Math.random() > 0.02)
                    continue

                var device = this.m_Devices[i]
                var updated = false
                const random_state = Math.random() > 0.5
                const random_address = Math.floor((Math.random() * 511)) + 1
                const random_mode = Math.floor((Math.random() * 15))
                const change_label = Math.random() > 0.75
                if (device.is_online != random_state) {
                    device.is_online = random_state
                    updated = true
                }
                if (device.address != random_address) {
                    device.address = random_address
                    updated = true
                }
                if (device.mode_index != random_mode) {
                    device.address = random_mode
                    updated = true
                }
                if (change_label) {
                    device.label = "Random Label " + Math.floor(Math.random() * 1000)
                    updated = true
                }
                if (updated) {
                    update_list.push(device)
                }
            }

            for (var i = 0; i < update_list.length; i++) {
                this._param.device_updated_callback(update_list[i])
            }
        }
    }

    public GetDeviceCount(): number {
        return this.m_Devices.length;
    }

    public GetDeviceByIndex(index: number): RDM_Device {
        return this.m_Devices[index]
    }

    private AddDevices(count: number) {
        for (var i = 0; i < count; i++) {
            const na = Math.random() > 0.5
            this.m_Devices.push({
                is_online: true,
                uid: (na ? "4E41" : "1AFA") + this.m_Counter.toString(16).padStart(8, '0'),
                uid_integer: BigInt((na ? 0x4E4100000000 : 0x1AFA00000000) + this.m_Counter),
                label: "Device " + this.m_Counter,
                manufacturer: na ? "Company NA" : "TMB",
                model: "Test Device",
                mode_index: 1,
                mode_count: 16,
                address: 1,
            })
            this.m_Counter++
            this._param.device_added_callback(this.m_Devices[this.m_Devices.length - 1])
        }
    }
}