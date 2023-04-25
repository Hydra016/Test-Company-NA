export interface RDM_Device {
    uid_integer: BigInt   // Unique ID integer value
    uid: string           // Unique ID hexadecimal formatted string value (ABCD:12345678)
    is_online: boolean,   // true/false
    label: string         // Device Label
    manufacturer: string  // Device Manufacturer
    model: string         // Device Model Name
    mode_index: number    // Device Mode Index
    mode_count: number    // Device Mode Count
    address: number       // Device Address
}