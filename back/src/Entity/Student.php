<?php

namespace App\Entity;

use App\Entity\Traits\LocatableTrait;
use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: StudentRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Student
{
    use LocatableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['request'])]
    private ?Uuid $id = null;

    #[ORM\OneToOne(inversedBy: 'student', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['request', 'student'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Experience::class, orphanRemoval: true)]
    private Collection $experiences;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Skill::class, orphanRemoval: true)]
    private Collection $skills;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Hobby::class, orphanRemoval: true)]
    private Collection $hobbies;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Formation::class, orphanRemoval: true)]
    private Collection $formations;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Application::class)]
    private Collection $applications;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: SpontaneousApplication::class)]
    private Collection $spontaneousApplications;

    /**
     * @var Collection<int, Request>
     */
    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Request::class)]
    private Collection $requests;

    public function __construct()
    {
        $this->experiences = new ArrayCollection();
        $this->skills = new ArrayCollection();
        $this->hobbies = new ArrayCollection();
        $this->formations = new ArrayCollection();
        $this->applications = new ArrayCollection();
        $this->spontaneousApplications = new ArrayCollection();
        $this->requests = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setStudent($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            if ($experience->getStudent() === $this) {
                $experience->setStudent(null);
            }
        }

        return $this;
    }

    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): static
    {
        if (!$this->skills->contains($skill)) {
            $this->skills->add($skill);
            $skill->setStudent($this);
        }

        return $this;
    }

    public function removeSkill(Skill $skill): static
    {
        if ($this->skills->removeElement($skill)) {
            if ($skill->getStudent() === $this) {
                $skill->setStudent(null);
            }
        }

        return $this;
    }

    public function getHobbies(): Collection
    {
        return $this->hobbies;
    }

    public function addHobby(Hobby $hobby): static
    {
        if (!$this->hobbies->contains($hobby)) {
            $this->hobbies->add($hobby);
            $hobby->setStudent($this);
        }

        return $this;
    }

    public function removeHobby(Hobby $hobby): static
    {
        if ($this->hobbies->removeElement($hobby)) {
            if ($hobby->getStudent() === $this) {
                $hobby->setStudent(null);
            }
        }

        return $this;
    }

    public function getFormations(): Collection
    {
        return $this->formations;
    }

    public function addFormation(Formation $formation): static
    {
        if (!$this->formations->contains($formation)) {
            $this->formations->add($formation);
            $formation->setStudent($this);
        }

        return $this;
    }

    public function removeFormation(Formation $formation): static
    {
        if ($this->formations->removeElement($formation)) {
            if ($formation->getStudent() === $this) {
                $formation->setStudent(null);
            }
        }

        return $this;
    }

    public function getApplications(): Collection
    {
        return $this->applications;
    }

    public function addApplication(Application $application): static
    {
        if (!$this->applications->contains($application)) {
            $this->applications->add($application);
            $application->setStudent($this);
        }

        return $this;
    }

    public function removeApplication(Application $application): static
    {
        if ($this->applications->removeElement($application)) {
            if ($application->getStudent() === $this) {
                $application->setStudent(null);
            }
        }

        return $this;
    }

    public function getSpontaneousApplications(): Collection
    {
        return $this->spontaneousApplications;
    }

    public function addSpontaneousApplication(SpontaneousApplication $spontaneousApplication): static
    {
        if (!$this->spontaneousApplications->contains($spontaneousApplication)) {
            $this->spontaneousApplications->add($spontaneousApplication);
            $spontaneousApplication->setStudent($this);
        }

        return $this;
    }

    public function removeSpontaneousApplication(SpontaneousApplication $spontaneousApplication): static
    {
        if ($this->spontaneousApplications->removeElement($spontaneousApplication)) {
            if ($spontaneousApplication->getStudent() === $this) {
                $spontaneousApplication->setStudent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Request>
     */
    public function getRequests(): Collection
    {
        return $this->requests;
    }

    public function addRequest(Request $request): static
    {
        if (!$this->requests->contains($request)) {
            $this->requests->add($request);
            $request->setStudent($this);
        }

        return $this;
    }

    public function removeRequest(Request $request): static
    {
        if ($this->requests->removeElement($request)) {
            // set the owning side to null (unless already changed)
            if ($request->getStudent() === $this) {
                $request->setStudent(null);
            }
        }

        return $this;
    }
}
