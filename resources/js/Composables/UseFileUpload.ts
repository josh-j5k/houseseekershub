import { ref } from "vue";
const filesArr = ref(<File[]>[])
export function useFileUpload() {
    const imgSrc = ref(<string[]>[])
    const total = ref(0)
    function assignFiles(fileInput: HTMLInputElement) {
        fileInput.addEventListener('change', (ev: Event) => {
            const inputTarget = ev.target as HTMLInputElement
            if (inputTarget.files !== null) {
                for (let index = 0; index < inputTarget.files.length; index++) {
                    const file = inputTarget.files[index];
                    filesArr.value = [...filesArr.value, file]
                }
            }
            const newDt = new DataTransfer()
            filesArr.value.forEach(file => newDt.items.add(file))
            fileInput.files = newDt.files
            total.value = fileInput.files.length
            console.log(filesArr)
            handleFiles(newDt.files)
        })
    }

    function dragenter(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
    }
    function drop(e: any, fileInput: HTMLInputElement) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;

        for (let index = 0; index < dt.files.length; index++) {
            const file = dt.files[index];

            filesArr.value = [...filesArr.value, file];
        }
        const newDt = new DataTransfer()
        filesArr.value.forEach(file => newDt.items.add(file))
        fileInput.files = newDt.files
        total.value = fileInput.files.length
        console.log(filesArr)
        handleFiles(newDt.files);
    }

    function deleteFile(fileInput: HTMLInputElement, btnIndex: number) {
        const dt = new DataTransfer()
        filesArr.value.splice(btnIndex, 1)
        imgSrc.value.splice(btnIndex, 1)
        filesArr.value.forEach(file => dt.items.add(file))
        fileInput.files = dt.files
        total.value = fileInput.files.length

    }
    function handleFiles(files: FileList) {
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const src = ref('')



            if (!file.type.startsWith("image/")) {
                continue;
            }


            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e: any) => {
                src.value = e.target.result;
                imgSrc.value = [...imgSrc.value, src.value]

            };
        }
    }

    return {
        drop, dragenter, dragover, deleteFile, assignFiles, total, imgSrc, filesArr
    }


}