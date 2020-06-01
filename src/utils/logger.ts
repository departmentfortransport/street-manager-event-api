import { injectable } from 'inversify'

@injectable()
export default class Logger {

  public log(message: any): void {
    console.log(message)
  }

  public error(message: string): void {
    console.error(message)
  }
}
