"use client"

import { useDispatch, useSelector } from "react-redux"
import { DispatchStatus, RootState } from "../store"

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<DispatchStatus>()