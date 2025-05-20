export interface IVehicleProfile {
    id: number;
    name: string;
    make: string | null;
    modelYear: string | null;
    licensePlate: string | null;
    mileage?: number | null;
    photosOfVehicle: string;
    createdAtRaw?: string | null;
    createdAtFormatted?: string | null;
    updatedAtRaw?: string | null;
    updatedAtFormatted?: string | null;
}
