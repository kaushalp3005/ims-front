export type Company = "CDPL" | "CFPL" | "JTC" | "HOH"

export type Role = "admin" | "ops" | "approver" | "viewer" | "developer"

export type Action = "access" | "view" | "create" | "edit" | "delete" | "approve"

export type Module = "dashboard" | "inward" | "inventory-ledger" | "transfer" | "outward" | "reports" | "settings" | "developer"

export interface User {
  id: string
  email: string
  name: string
  isDeveloper: boolean
  companies: Array<{
    code: Company
    role: Role
    name: string
  }>
}

export interface ModulePermission {
  moduleCode: Module
  moduleName: string
  permissions: {
    access: boolean
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
    approve: boolean
  }
}

export interface CompanyAccess {
  code: Company
  name: string
  role: Role
  modules: ModulePermission[]
}

export interface Session {
  user: User | null
  currentCompany: Company | null
}

export interface OpenFGATuple {
  user: string
  relation: string
  object: string
}

// Legacy interfaces for backward compatibility
export interface LegacyUser {
  id: string
  name: string
  email: string
  primaryCompanyCode: Company
  companies: Array<{
    code: Company
    role: "CompanyAdmin" | "Manager" | "Operator" | "Viewer"
    moduleAccess: Record<string, "locked" | "view" | "edit" | "approve">
  }>
}

export interface Contact {
  phone?: string
  email?: string
}
