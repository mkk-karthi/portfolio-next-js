# Antigravity Rules & Coding Guidelines

## Tailwind CSS Coding Rules

1. **Linear Gradients**:
   - Do **NOT** use `bg-gradient-to-*` (legacy).
   - **Always** use `bg-linear-to-*` (e.g., `bg-linear-to-r`, `bg-linear-to-br`, `bg-linear-to-b`).

2. **Equal Width & Height (`size-{n}`)**:
   - Whenever width and height are identical, do **NOT** write `w-{n} h-{n}`.
   - **Always** use `size-{n}` (e.g., `size-10` instead of `w-10 h-10`, `size-8` instead of `w-8 h-8`, `size-4` instead of `w-4 h-4`).

3. **Standard Spacing Scale ($px / 4$)**:
   - Do **NOT** use arbitrary pixel brackets like `w-[40px]` or `min-w-[20px]`.
   - Divide pixels by 4 to map to standard units:
     - `w-[40px]` $\rightarrow$ `w-10`
     - `w-[24px]` $\rightarrow$ `w-6`
     - `min-w-[20px]` $\rightarrow$ `min-w-5`
     - `min-h-[1.25rem]` $\rightarrow$ `min-h-5` ($20px$)
     - `min-h-[2rem]` $\rightarrow$ `min-h-8` ($32px$)
     - `min-h-[2.5rem]` $\rightarrow$ `min-h-10` ($40px$)

4. **Aspect Ratio & Z-Index Utilities**:
   - Use standard classes without brackets:
     - `aspect-[4/3]` $\rightarrow$ `aspect-4/3`
     - `z-[999]` $\rightarrow$ `z-999`

5. **Single Display Style per Element**:
   - Do **NOT** combine multiple conflicting display utilities on a single element (e.g., avoid `block ... flex items-center`).
   - Use a single, unambiguous display property (e.g., `flex items-center gap-1`).

6. **General Styling Rule**:
   - Use Tailwind CSS utilities; avoid raw inline styles and raw custom CSS.
