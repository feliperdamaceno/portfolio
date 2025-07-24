import type { GitHubRepo } from '@/types'

type ResourceResponse<T> = Promise<[T, null] | [null, Error]>

export async function getResource<T>(url: string): ResourceResponse<T> {
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      throw Error(`${response.status}: not able to get resource`)
    }

    const data = (await response.json()) as T
    return [data, null]
  } catch (error) {
    if (error instanceof Error) return [null, error]
    throw error
  }
}

export function getFeaturedRepositories(repositories: GitHubRepo[]) {
  return repositories
    .filter((repository) => repository.topics.includes('featured'))
    .reverse()
}
