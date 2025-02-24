export interface Device {
  id: number;
  imei: string;
  code: string;
  name: string;
  description: string;
  thresholds: Threshold[];
  notifications: Notification[];
  latest?: DeviceData;
}

export interface DeviceData {
  imei: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;
  angle: number;
  satellites: number;
  speed: number;
  sensorData: SensorData[]; // Up to 4 sensors
}

export interface Threshold {
  id: number;
  deviceId: number;
  thresholdType: 'HIGH' | 'LOW' | 'RANGE';
  sensorType: 'TEMPERATURE' | 'HUMIDITY' | 'MOVEMENT_COUNT' | 'BATTERY_VOLTAGE' | 'ROLL' | 'PITCH' | 'MAGNET_COUNT';
  parameterCode: string; // e.g., "10800"
  unit: 'CELSIUS' | 'PERCENT' | 'VOLTAGE' | 'MOVEMENT_COUNT';
  minValue: number | null;
  maxValue: number | null;
}

export interface SensorData {
  parameterCode: string; // e.g., "10800"
  sensorType: 'TEMPERATURE' | 'HUMIDITY' | 'MOVEMENT_COUNT' | 'BATTERY_VOLTAGE' | 'ROLL' | 'PITCH' | 'MAGNET_COUNT';
  value: number;
  unit: string;
}

export interface Notification {
  id: number;
  deviceId: number;
  message: string;
  read: boolean;
}

export enum DeviceEvent {
  MOTION_DETECTED = 10829,
  SHOCK_DETECTED = 10831,
  BATTERY_LOW = 385,
}