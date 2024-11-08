/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TableImport } from './routes/table'
import { Route as IndexImport } from './routes/index'
import { Route as TableDetailsImport } from './routes/table_.details'
import { Route as TableEditImport } from './routes/table.edit'
import { Route as TableAddImport } from './routes/table.add'
import { Route as TablePatientIdEditImport } from './routes/table.$patientId.edit'
import { Route as TablePatientIdDeleteImport } from './routes/table.$patientId.delete'

// Create/Update Routes

const TableRoute = TableImport.update({
  path: '/table',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TableDetailsRoute = TableDetailsImport.update({
  path: '/table/details',
  getParentRoute: () => rootRoute,
} as any)

const TableEditRoute = TableEditImport.update({
  path: '/edit',
  getParentRoute: () => TableRoute,
} as any)

const TableAddRoute = TableAddImport.update({
  path: '/add',
  getParentRoute: () => TableRoute,
} as any)

const TablePatientIdEditRoute = TablePatientIdEditImport.update({
  path: '/$patientId/edit',
  getParentRoute: () => TableRoute,
} as any)

const TablePatientIdDeleteRoute = TablePatientIdDeleteImport.update({
  path: '/$patientId/delete',
  getParentRoute: () => TableRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/table': {
      id: '/table'
      path: '/table'
      fullPath: '/table'
      preLoaderRoute: typeof TableImport
      parentRoute: typeof rootRoute
    }
    '/table/add': {
      id: '/table/add'
      path: '/add'
      fullPath: '/table/add'
      preLoaderRoute: typeof TableAddImport
      parentRoute: typeof TableImport
    }
    '/table/edit': {
      id: '/table/edit'
      path: '/edit'
      fullPath: '/table/edit'
      preLoaderRoute: typeof TableEditImport
      parentRoute: typeof TableImport
    }
    '/table/details': {
      id: '/table/details'
      path: '/table/details'
      fullPath: '/table/details'
      preLoaderRoute: typeof TableDetailsImport
      parentRoute: typeof rootRoute
    }
    '/table/$patientId/delete': {
      id: '/table/$patientId/delete'
      path: '/$patientId/delete'
      fullPath: '/table/$patientId/delete'
      preLoaderRoute: typeof TablePatientIdDeleteImport
      parentRoute: typeof TableImport
    }
    '/table/$patientId/edit': {
      id: '/table/$patientId/edit'
      path: '/$patientId/edit'
      fullPath: '/table/$patientId/edit'
      preLoaderRoute: typeof TablePatientIdEditImport
      parentRoute: typeof TableImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  TableRoute: TableRoute.addChildren({
    TableAddRoute,
    TableEditRoute,
    TablePatientIdDeleteRoute,
    TablePatientIdEditRoute,
  }),
  TableDetailsRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.ts",
      "children": [
        "/",
        "/table",
        "/table/details"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/table": {
      "filePath": "table.tsx",
      "children": [
        "/table/add",
        "/table/edit",
        "/table/$patientId/delete",
        "/table/$patientId/edit"
      ]
    },
    "/table/add": {
      "filePath": "table.add.tsx",
      "parent": "/table"
    },
    "/table/edit": {
      "filePath": "table.edit.tsx",
      "parent": "/table"
    },
    "/table/details": {
      "filePath": "table_.details.tsx"
    },
    "/table/$patientId/delete": {
      "filePath": "table.$patientId.delete.tsx",
      "parent": "/table"
    },
    "/table/$patientId/edit": {
      "filePath": "table.$patientId.edit.tsx",
      "parent": "/table"
    }
  }
}
ROUTE_MANIFEST_END */
