import { subPath } from '@/interfaces'

/**
 * Breaks a path into sub-paths.
 * @param {string} newpath the new path to break into sub-paths.
 * @param {string} oldpath the old path to compare with the new path.
 */
export default function createSubPaths(newpath: string, oldpath: string): [string, subPath[]] {
    if (oldpath === undefined) oldpath = ''
    if (newpath === undefined) newpath = ''

    // Normalize paths for forward slashes?
    newpath = newpath.replace(/\\/g, '/')
    oldpath = oldpath.replace(/\\/g, '/')

    if (newpath.endsWith('/')) {
        newpath = newpath.slice(0, -1)
    }

    if (oldpath.endsWith('/')) {
        oldpath = oldpath.slice(0, -1)
    }

    if (oldpath.startsWith('/')) {
        oldpath = oldpath.replace('/', '')
    }

    if (newpath.startsWith('/')) {
        newpath = newpath.replace('/', '')
    }

    const newlist = newpath.split('/').filter(Boolean)
    const oldlist = oldpath.split('/').filter(Boolean)

    if (oldpath.includes(newpath)) {
        const current = newlist.slice(-1)[0]
        return [oldpath, createSubs(oldlist, current)]
    } else {
        const current = newlist.slice(-1)[0]
        return [newpath, createSubs(newlist, current)]
    }

    function createSubs(list: string[], current: string) {
        const paths = list
            .map((path, index) => {
                return {
                    active: false,
                    name: path,
                    path: list.slice(0, index + 1).join('/'),
                }
            })
            .filter(item => item.name)

        paths.reverse()

        for (let i = 0; i < paths.length; i++) {
            if (paths[i].name === current) {
                paths[i].active = true
                break
            }
        }

        return paths.reverse()
    }
}

// TODO: Fix the includes issue.
