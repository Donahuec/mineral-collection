"use client";
import { Button, Dialog, DialogTrigger, Label, Modal, ModalOverlay, OverlayArrow, Popover, Radio, RadioGroup } from "react-aria-components";
import styles from "./specimenFilters.module.css";
import React, { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SpecimenFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())
  const [sortBy, setSortBy] = React.useState<string>(params.get("sortBy") || "numericId");
  const [sortOrder, setSortOrder] = React.useState(params.get("sortOrder") || "asc");
  const [page, setPage] = React.useState(params.get("page") ? parseInt(params.get("page") as string) : 1);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function updateSortBy(newSortBy: string) {
    setSortBy(newSortBy);
    router.push(pathname + "?" + createQueryString("sortBy", newSortBy))
  }

  function updateSortOrder(newSortOrder: string) {
    setSortOrder(newSortOrder);
    router.push(pathname + "?" + createQueryString("sortOrder", newSortOrder))
  }

  function updatePage(forward: boolean) {
    const newPage = forward ? page + 1 : page - 1
    setPage(newPage);
    router.push(pathname + "?" + createQueryString("page", newPage.toString()))
  }

  return (
    <div className={styles.container}>
      <DialogTrigger defaultOpen={false}>
        <Button className={styles.sidebarButton}>toggle</Button>
        <ModalOverlay className={styles.modalOverlay} isDismissable>
          <Modal className={styles.filters}>
            <Dialog >
              <h2 className={styles.filterHead}>Filters <Button slot="close" className={styles.closeButton}>
                X
              </Button></h2>
              <div className={styles.filterGroup}>
                <RadioGroup className={styles.radioGroup} name="sortBy"
                  value={sortBy}
                  onChange={updateSortBy}>
                  <Label>Sort By</Label>
                  <Radio className={styles.radio} value="name">Name</Radio>
                  <Radio className={styles.radio} value="numericId">NumericId</Radio>
                </RadioGroup>
                <RadioGroup className={styles.radioGroup} name="sortOrder"
                  value={sortOrder}
                  onChange={updateSortOrder}>
                  <Label>Sort Order</Label>
                  <Radio className={styles.radio} value="asc">Asc</Radio>
                  <Radio className={styles.radio} value="desc">Desc</Radio>
                </RadioGroup>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.filterGroup}>
                <div className={styles.paginator}>
                  <Button onPress={() => updatePage(false)} isDisabled={page <= 1} className={styles.paginatorButton}>
                    <ArrowLeft className={styles.icon} />
                  </Button>
                  <span>Page {page}</span>
                  <Button onPress={() => updatePage(true)} className={styles.paginatorButton}>
                    <ArrowRight size={24} className={styles.icon} />
                  </Button>
                </div>
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
