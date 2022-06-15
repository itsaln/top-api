import { Injectable, Logger } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { HhResponse } from '@app/hh/hh.models'
import { HhData } from '@app/top-page/top-page.model'
import { API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from '@app/hh/hh.constants'

@Injectable()
export class HhService {
  // private token: string

  constructor(
    // private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    // this.token = this.configService.get('HH_TOKEN') ?? ''
  }

  async getData(text: string) {
    try {
      const { data } = await this.httpService.get<HhResponse>(API_URL.vacancies, {
        params: {
          text,
          clusters: true
        },
        headers: {
          'User-Agent': 'TopApi/1.0 (itsaln23@gmail.com)'
          // Authorization: 'Bearer ' + this.token
        }
      }).toPromise()
      return this.parseData(data)
    } catch (e) {
      Logger.error(e)
    }
  }

  private parseData(data: HhResponse): HhData {
    const salaryCluster = data.clusters.find(c => c.id === SALARY_CLUSTER_ID)
    if (!salaryCluster) {
      throw new Error(CLUSTER_FIND_ERROR)
    }
    const juniorSalary = HhService.getSalaryFromString(salaryCluster.items[1].name)
    const middleSalary = HhService.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name)
    const seniorSalary = HhService.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name)

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date()
    }
  }

  private static getSalaryFromString(s: string): number {
    const numberRegExp = /(\d+)/g
    const res = s.match(numberRegExp)
    if (!res) {
      return 0
    }
    return Number(res[0])
  }
}
