import { defineComponent, h, reactive, provide, inject } from "vue"

// ---------------------
// Sidebar Components
// ---------------------

export const useSidebar = () => {
  const state = inject("sidebarState") as { value: "collapsed" | "expanded" }
  if (!state) throw new Error("useSidebar must be used within SidebarProvider")
  return { state }
}

// ---------------------
// Sidebar Provider
// ---------------------
export const SidebarProvider = defineComponent({
  name: "SidebarProvider",
  setup(_, { slots }) {
    const state = reactive({ value: "expanded" as "collapsed" | "expanded" })
    provide("sidebarState", state)
    return () => h("div", slots.default?.())
  },
})

export const Sidebar = defineComponent({
  name: "Sidebar",
  props: { collapsible: String },
  setup(_, { slots }) {
    return () => h("div", slots.default?.())
  },
})

export const SidebarContent = defineComponent({
  name: "SidebarContent",
  setup(_, { slots }) {
    return () => h("div", { class: "flex flex-col" }, slots.default?.())
  },
})

export const SidebarGroup = defineComponent({
  name: "SidebarGroup",
  setup(_, { slots }) {
    return () => h("div", { class: "mt-4" }, slots.default?.())
  },
})

export const SidebarGroupContent = defineComponent({
  name: "SidebarGroupContent",
  setup(_, { slots }) {
    return () => h("div", { class: "flex flex-col" }, slots.default?.())
  },
})

export const SidebarGroupLabel = defineComponent({
  name: "SidebarGroupLabel",
  setup(_, { slots }) {
    return () => h("div", { class: "mb-2 text-sm font-medium" }, slots.default?.())
  },
})

export const SidebarMenu = defineComponent({
  name: "SidebarMenu",
  setup(_, { slots }) {
    return () => h("div", { class: "flex flex-col" }, slots.default?.())
  },
})

export const SidebarMenuItem = defineComponent({
  name: "SidebarMenuItem",
  setup(_, { slots }) {
    return () => h("div", slots.default?.())
  },
})

export const SidebarMenuButton = defineComponent({
  name: "SidebarMenuButton",
  props: { class: String },
  emits: ["click"],
  setup(props, { slots, emit }) {
    return () =>
      h(
        "button",
        {
          class: `w-full text-left flex items-center gap-2 px-3 py-2 rounded ${props.class || ""}`,
          onClick: () => emit("click"),
        },
        slots.default?.()
      )
  },
})

// ---------------------
// Sidebar Trigger
// ---------------------
export const SidebarTrigger = defineComponent({
  name: "SidebarTrigger",
  setup(_, { slots }) {
    const { state } = useSidebar()
    const toggle = () => {
      state.value = state.value === "collapsed" ? "expanded" : "collapsed"
    }
    return () =>
      h(
        "button",
        { class: "p-1 rounded hover:bg-white/20", onClick: toggle },
        slots.default?.() || "Toggle"
      )
  },
})

// ---------------------
// Form Components
// ---------------------

export const Button = defineComponent({
  name: "Button",
  props: { class: String, type: { type: String, default: "button" } },
  emits: ["click"],
  setup(props, { slots, emit }) {
    return () =>
      h(
        "button",
        {
          type: props.type,
          class: `px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${props.class || ""}`,
          onClick: () => emit("click"),
        },
        slots.default?.()
      )
  },
})

export const Input = defineComponent({
  name: "Input",
  props: {
    modelValue: String,
    placeholder: String,
    type: { type: String, default: "text" },
    class: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return () =>
      h("input", {
        type: props.type,
        value: props.modelValue,
        placeholder: props.placeholder,
        class: `px-3 py-2 border rounded w-full ${props.class || ""}`,
        onInput: (e: Event) =>
          emit("update:modelValue", (e.target as HTMLInputElement).value),
      })
  },
})

export const Label = defineComponent({
  name: "Label",
  setup(_, { slots }) {
    return () => h("label", { class: "block mb-1 font-medium" }, slots.default?.())
  },
})

export const Select = defineComponent({
  name: "Select",
  props: { modelValue: String, class: String },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    return () =>
      h(
        "select",
        {
          value: props.modelValue,
          class: `px-3 py-2 border rounded w-full ${props.class || ""}`,
          onChange: (e: Event) =>
            emit("update:modelValue", (e.target as HTMLSelectElement).value),
        },
        slots.default?.()
      )
  },
})

export const SelectItem = defineComponent({
  name: "SelectItem",
  props: { value: String },
  setup(props, { slots }) {
    return () => h("option", { value: props.value }, slots.default?.())
  },
})

export const SelectTrigger = defineComponent({
  name: "SelectTrigger",
  setup(_, { slots }) {
    return () =>
      h(
        "button",
        { class: "px-3 py-2 border rounded w-full text-left" },
        slots.default?.()
      )
  },
})

export const SelectValue = defineComponent({
  name: "SelectValue",
  props: { value: String },
  setup(props) {
    return () => h("span", { class: "block" }, props.value)
  },
})

// ---------------------
// Dialog Components
// ---------------------

export const Dialog = defineComponent({
  name: "Dialog",
  props: { open: Boolean },
  emits: ["update:open"],
  setup(props, { emit, slots }) {
    return () =>
      props.open
        ? h(
            "div",
            {
              class:
                "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
            },
            slots.default?.({ close: () => emit("update:open", false) })
          )
        : null
  },
})

export const DialogContent = defineComponent({
  name: "DialogContent",
  setup(_, { slots }) {
    return () =>
      h(
        "div",
        { class: "bg-white rounded p-4 w-full max-w-md" },
        slots.default?.()
      )
  },
})

export const DialogHeader = defineComponent({
  name: "DialogHeader",
  setup(_, { slots }) {
    return () => h("div", { class: "mb-2" }, slots.default?.())
  },
})

export const DialogTitle = defineComponent({
  name: "DialogTitle",
  setup(_, { slots }) {
    return () => h("h2", { class: "text-lg font-bold" }, slots.default?.())
  },
})

export const DialogDescription = defineComponent({
  name: "DialogDescription",
  setup(_, { slots }) {
    return () => h("p", { class: "text-gray-600" }, slots.default?.())
  },
})

export const DialogFooter = defineComponent({
  name: "DialogFooter",
  setup(_, { slots }) {
    return () =>
      h("div", { class: "mt-4 flex justify-end gap-2" }, slots.default?.())
  },
})
