export interface IVehicleProfile {
    id: number;
    name: string;
    make?: string | null;
    modelYear?: number | null;
    licensePlate?: string | null;
    mileage?: number | null;
    photosOfVehicle?: string | null;
    createdAtRaw?: string | null;
    createdAtFormatted?: string | null;
    updatedAtRaw?: string | null;
    updatedAtFormatted?: string | null;
}
