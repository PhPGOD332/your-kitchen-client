import type { IWorker } from "@/types/IWorker";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class UserWorkerService {

  static async getWorkers (): Promise<IWorker[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/workers`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });
    const jsonWorkers: IWorker[] = await response.json();
    
    const returnWorkers: IWorker[] = [...jsonWorkers];

    const workerWithPhotos: IWorker[] = returnWorkers.map((worker) => {
      worker.photo = `${NEXT_PUBLIC_API_URL}/images/${worker.photo}`
      return worker;
    });

    return workerWithPhotos;
  };
}